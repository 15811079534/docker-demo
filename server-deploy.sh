#!/bin/bash

# 此脚本放在服务器上使用: /root/deploy-9agent.sh

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🚀 部署 9Agent PC 网站${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 项目目录
PROJECT_DIR="/home/www/9agent-pc"

# 检查项目目录
if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${RED}❌ 项目目录不存在: $PROJECT_DIR${NC}"
    exit 1
fi

# 进入项目目录
cd $PROJECT_DIR || exit 1

# 备份当前版本（可选）
echo -e "${BLUE}[1/6] 📦 备份当前版本...${NC}"
BACKUP_DIR="/backup/9agent-pc"
mkdir -p $BACKUP_DIR
BACKUP_FILE="$BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).tar.gz"
tar -czf $BACKUP_FILE . 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 备份成功: $BACKUP_FILE${NC}"
    # 只保留最近5个备份
    ls -t $BACKUP_DIR/backup_*.tar.gz | tail -n +6 | xargs -r rm
else
    echo -e "${YELLOW}⚠️  备份失败，继续部署...${NC}"
fi
echo ""

# 拉取最新代码
echo -e "${BLUE}[2/6] 📥 拉取最新代码...${NC}"
if [ -d ".git" ]; then
    git pull origin main
    if [ $? -ne 0 ]; then
        echo -e "${YELLOW}⚠️  Git 拉取失败，使用本地文件部署${NC}"
    else
        echo -e "${GREEN}✅ 代码更新成功${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  非 Git 项目，跳过拉取${NC}"
fi
echo ""

# 停止旧容器
echo -e "${BLUE}[3/6] 🛑 停止旧容器...${NC}"
docker-compose down
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 旧容器已停止${NC}"
else
    echo -e "${RED}❌ 停止容器失败${NC}"
    exit 1
fi
echo ""

# 构建新镜像
echo -e "${BLUE}[4/6] 🔨 构建新镜像...${NC}"
docker-compose build --no-cache
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 构建失败！${NC}"
    echo -e "${YELLOW}正在恢复备份...${NC}"
    docker-compose up -d
    exit 1
fi
echo -e "${GREEN}✅ 镜像构建成功${NC}"
echo ""

# 启动新容器
echo -e "${BLUE}[5/6] 🚀 启动新容器...${NC}"
docker-compose up -d
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 启动失败！${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 容器启动成功${NC}"
echo ""

# 清理旧镜像
echo -e "${BLUE}[6/6] 🧹 清理旧镜像...${NC}"
docker image prune -f
echo -e "${GREEN}✅ 清理完成${NC}"
echo ""

# 等待服务启动
echo -e "${YELLOW}⏳ 等待服务启动...${NC}"
sleep 5

# 验证部署
echo -e "${BLUE}🔍 验证部署...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)

if [ "$HTTP_CODE" == "200" ]; then
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}✨ 部署成功！${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "📍 访问地址: ${BLUE}http://101.201.42.83${NC}"
    echo -e "📊 容器状态: ${GREEN}运行中${NC}"
    echo -e "💾 备份位置: ${YELLOW}$BACKUP_FILE${NC}"
    echo ""
    echo -e "${GREEN}========================================${NC}"
    
    # 显示容器状态
    echo ""
    echo -e "${BLUE}📦 容器信息:${NC}"
    docker-compose ps
else
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}❌ 部署失败！${NC}"
    echo -e "${RED}========================================${NC}"
    echo ""
    echo -e "HTTP状态码: ${RED}$HTTP_CODE${NC}"
    echo ""
    echo -e "${YELLOW}查看日志:${NC}"
    docker-compose logs --tail=50 web
    echo ""
    echo -e "${YELLOW}完整日志: docker-compose logs -f${NC}"
    echo -e "${RED}========================================${NC}"
    exit 1
fi

