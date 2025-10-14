#!/bin/bash

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🚀 部署 9Agent PC 到生产服务器${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ 错误：请在项目根目录运行此脚本${NC}"
    exit 1
fi

# 检查 Git 状态
echo -e "${BLUE}[1/5] 📝 检查 Git 状态...${NC}"
git status
echo ""

# 提交代码
echo -e "${BLUE}[2/5] 💾 提交代码到 Git...${NC}"
read -p "请输入提交信息 (直接回车使用默认): " commit_msg
commit_msg=${commit_msg:-"update: 更新代码"}

git add .
if git commit -m "$commit_msg"; then
    echo -e "${GREEN}✅ 代码提交成功${NC}"
else
    echo -e "${YELLOW}⚠️  没有需要提交的更改，继续部署...${NC}"
fi
echo ""

# 推送到远程仓库
echo -e "${BLUE}[3/5] 📤 推送到远程仓库...${NC}"
if git push origin main; then
    echo -e "${GREEN}✅ 推送成功${NC}"
else
    echo -e "${YELLOW}⚠️  推送失败，可能还没配置远程仓库，继续部署...${NC}"
fi
echo ""

# 连接服务器并部署
echo -e "${BLUE}[4/5] 🔄 连接服务器并部署...${NC}"
echo "正在执行远程部署命令..."

ssh root@101.201.42.83 << 'ENDSSH'
cd /home/www/9agent-pc
git pull origin main 2>/dev/null || echo '跳过 git pull'
docker-compose down
docker-compose up -d --build
docker image prune -f
ENDSSH

if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}❌ 部署失败！请检查：${NC}"
    echo "   1. 是否已配置 SSH 免密登录"
    echo "   2. 服务器是否可以连接"
    echo "   3. Docker 是否正常运行"
    exit 1
fi
echo ""

# 验证部署
echo -e "${BLUE}[5/5] ✅ 验证部署...${NC}"
sleep 3
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✨ 部署完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "📍 访问地址: ${BLUE}http://101.201.42.83${NC}"
echo -e "📊 查看日志: ${YELLOW}ssh root@101.201.42.83 'docker-compose -f /home/www/9agent-pc/docker-compose.yml logs -f'${NC}"
echo ""
echo -e "${GREEN}========================================${NC}"

