# 代码更新部署指南

> 本文档说明如何在修改代码后重新部署到服务器

---

## 📋 目录

1. [方案一：手动上传部署（推荐新手）](#方案一手动上传部署推荐新手)
2. [方案二：Git 自动部署（推荐）](#方案二git-自动部署推荐)
3. [方案三：CI/CD 自动化部署（最佳实践）](#方案三cicd-自动化部署最佳实践)
4. [部署脚本](#部署脚本)
5. [常见问题](#常见问题)

---

## 方案一：手动上传部署（推荐新手）

### 适用场景
- 小改动（修改几个文件）
- 不熟悉 Git 操作
- 快速验证

### 操作步骤

#### 1. 在本地修改代码

在 VS Code 中编辑你的代码文件。

#### 2. 使用 Xftp 上传文件

**只上传修改过的文件**：
```
本地路径: D:\jiuxinshuzhi\doker-example\9agent-pc\
服务器路径: /home/www/9agent-pc/
```

**常见修改场景**：

- **修改页面内容**
  - 上传 `src/app/page.tsx`
  - 上传 `src/app/layout.tsx`
  - 上传相关组件文件

- **修改样式**
  - 上传 `src/app/globals.css`
  - 上传 `tailwind.config.ts`

- **添加新页面**
  - 上传整个新页面目录（如 `src/app/about/`）

- **修改配置**
  - 上传 `next.config.ts`
  - 上传 `package.json`（如果改了依赖）

#### 3. SSH 连接服务器

```bash
ssh root@101.201.42.83
cd /home/www/9agent-pc
```

#### 4. 重新构建并部署

**方式 A：完全重建（改了依赖或配置）**
```bash
docker-compose down
docker-compose up -d --build
```

**方式 B：快速重启（只改了代码）**
```bash
docker-compose restart
```

**方式 C：只重建不停机（推荐）**
```bash
docker-compose up -d --build
```

#### 5. 验证部署

```bash
# 查看容器日志
docker-compose logs -f web

# 访问网站
curl http://localhost:3000

# 浏览器访问
# http://101.201.42.83
```

---

## 方案二：Git 自动部署（推荐）

### 适用场景
- 多人协作开发
- 需要版本控制
- 频繁更新

### 前置准备

#### 1. 在服务器上配置 Git

```bash
# 安装 Git
yum install -y git

# 配置 Git（可选）
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

#### 2. 初始化 Git 仓库（首次）

**选项 A：使用 GitHub/GitLab**

```bash
cd /home/www/9agent-pc

# 初始化仓库
git init

# 添加远程仓库
git remote add origin https://github.com/yourusername/9agent-pc.git

# 或使用 SSH
git remote add origin git@github.com:yourusername/9agent-pc.git

# 拉取代码
git pull origin main
```

**选项 B：直接从本地推送**

在本地项目目录：
```bash
cd D:\jiuxinshuzhi\doker-example\9agent-pc

# 初始化（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/yourusername/9agent-pc.git

# 提交并推送
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 部署流程

#### 本地操作

```bash
# 1. 修改代码
# 2. 提交更改
git add .
git commit -m "更新：描述你的修改"

# 3. 推送到远程仓库
git push origin main
```

#### 服务器操作

```bash
# 1. SSH 连接服务器
ssh root@101.201.42.83

# 2. 进入项目目录
cd /home/www/9agent-pc

# 3. 拉取最新代码
git pull origin main

# 4. 重新构建部署
docker-compose up -d --build

# 5. 验证
docker-compose logs -f web
```

### 创建自动部署脚本

在服务器上创建 `/root/deploy-9agent.sh`：

```bash
#!/bin/bash

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}开始部署 9Agent PC 网站${NC}"
echo -e "${GREEN}========================================${NC}"

# 进入项目目录
cd /home/www/9agent-pc || exit

# 拉取最新代码
echo -e "${YELLOW}[1/4] 拉取最新代码...${NC}"
git pull origin main

if [ $? -ne 0 ]; then
    echo -e "${RED}拉取代码失败！${NC}"
    exit 1
fi

# 停止旧容器
echo -e "${YELLOW}[2/4] 停止旧容器...${NC}"
docker-compose down

# 重新构建镜像
echo -e "${YELLOW}[3/4] 构建新镜像...${NC}"
docker-compose build

if [ $? -ne 0 ]; then
    echo -e "${RED}构建失败！${NC}"
    exit 1
fi

# 启动新容器
echo -e "${YELLOW}[4/4] 启动新容器...${NC}"
docker-compose up -d

if [ $? -ne 0 ]; then
    echo -e "${RED}启动失败！${NC}"
    exit 1
fi

# 清理旧镜像
echo -e "${YELLOW}清理旧镜像...${NC}"
docker image prune -f

# 等待服务启动
echo -e "${YELLOW}等待服务启动...${NC}"
sleep 5

# 验证部署
echo -e "${YELLOW}验证部署...${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)

if [ "$HTTP_CODE" == "200" ]; then
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}部署成功！${NC}"
    echo -e "${GREEN}访问地址: http://101.201.42.83${NC}"
    echo -e "${GREEN}========================================${NC}"
else
    echo -e "${RED}========================================${NC}"
    echo -e "${RED}部署失败！HTTP状态码: $HTTP_CODE${NC}"
    echo -e "${RED}查看日志: docker-compose logs -f${NC}"
    echo -e "${RED}========================================${NC}"
    exit 1
fi
```

**使用方法**：

```bash
# 添加执行权限
chmod +x /root/deploy-9agent.sh

# 每次更新时运行
/root/deploy-9agent.sh
```

---

## 方案三：CI/CD 自动化部署（最佳实践）

### 适用场景
- 专业项目
- 团队协作
- 自动化运维

### GitHub Actions 配置

在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Deploy to server
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.SERVER_HOST }}
        username: ${{ secrets.SERVER_USER }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd /home/www/9agent-pc
          git pull origin main
          docker-compose down
          docker-compose up -d --build
          docker image prune -f
          
    - name: Verify deployment
      run: |
        sleep 10
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://${{ secrets.SERVER_HOST }})
        if [ "$HTTP_CODE" != "200" ]; then
          echo "Deployment failed! HTTP code: $HTTP_CODE"
          exit 1
        fi
        echo "Deployment successful!"
```

**配置 GitHub Secrets**：

在 GitHub 仓库设置中添加：
- `SERVER_HOST`: `101.201.42.83`
- `SERVER_USER`: `root`
- `SSH_PRIVATE_KEY`: 你的 SSH 私钥

**使用流程**：
1. 本地修改代码
2. 提交并推送到 GitHub
3. GitHub Actions 自动部署
4. 部署完成后自动验证

---

## 部署脚本

### 快速部署脚本（本地使用）

创建 `deploy.bat`（Windows）：

```batch
@echo off
echo ========================================
echo 部署 9Agent PC 到生产服务器
echo ========================================

echo.
echo [1/4] 提交代码到 Git...
git add .
set /p commit_msg="请输入提交信息: "
git commit -m "%commit_msg%"
git push origin main

echo.
echo [2/4] 连接服务器并拉取代码...
ssh root@101.201.42.83 "cd /home/www/9agent-pc && git pull origin main"

echo.
echo [3/4] 重新构建并启动容器...
ssh root@101.201.42.83 "cd /home/www/9agent-pc && docker-compose down && docker-compose up -d --build"

echo.
echo [4/4] 清理旧镜像...
ssh root@101.201.42.83 "docker image prune -f"

echo.
echo ========================================
echo 部署完成！
echo 访问地址: http://101.201.42.83
echo ========================================
pause
```

创建 `deploy.sh`（Linux/Mac）：

```bash
#!/bin/bash

echo "========================================"
echo "部署 9Agent PC 到生产服务器"
echo "========================================"

echo ""
echo "[1/4] 提交代码到 Git..."
git add .
read -p "请输入提交信息: " commit_msg
git commit -m "$commit_msg"
git push origin main

echo ""
echo "[2/4] 连接服务器并拉取代码..."
ssh root@101.201.42.83 "cd /home/www/9agent-pc && git pull origin main"

echo ""
echo "[3/4] 重新构建并启动容器..."
ssh root@101.201.42.83 "cd /home/www/9agent-pc && docker-compose down && docker-compose up -d --build"

echo ""
echo "[4/4] 清理旧镜像..."
ssh root@101.201.42.83 "docker image prune -f"

echo ""
echo "========================================"
echo "部署完成！"
echo "访问地址: http://101.201.42.83"
echo "========================================"
```

**使用方法**：

```bash
# Windows
deploy.bat

# Linux/Mac
chmod +x deploy.sh
./deploy.sh
```

---

## 常见问题

### Q1: 修改了代码但网站没变化？

**原因**：浏览器缓存

**解决方案**：
```bash
# 硬刷新浏览器
Ctrl + F5  (Windows)
Cmd + Shift + R  (Mac)

# 或清除浏览器缓存
```

### Q2: 构建很慢怎么办？

**优化方案**：

1. **使用国内镜像**

创建 `/home/www/9agent-pc/.npmrc`：
```
registry=https://registry.npmmirror.com
```

2. **使用 Docker 缓存**

```bash
# 不使用 --no-cache
docker-compose build
```

3. **只重启不重建**（仅改代码未改依赖）

```bash
docker-compose restart
```

### Q3: 如何回滚到上一个版本？

**使用 Git**：

```bash
# 查看提交历史
git log --oneline

# 回滚到指定版本
git checkout <commit-hash>

# 重新部署
docker-compose up -d --build

# 或者永久回滚
git reset --hard <commit-hash>
git push -f origin main
```

### Q4: 如何实现零停机部署？

**方案 1：使用两个容器（蓝绿部署）**

修改 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  web-blue:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    
  web-green:
    build: .
    ports:
      - "3001:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

部署流程：
```bash
# 1. 构建新版本（green）
docker-compose up -d --build web-green

# 2. 验证新版本
curl http://localhost:3001

# 3. 切换 Nginx 代理到 3001
# 4. 停止旧版本（blue）
docker-compose stop web-blue
```

**方案 2：使用 Docker Swarm 或 Kubernetes**

### Q5: 如何查看部署日志？

```bash
# 实时日志
docker-compose logs -f web

# 最近100行
docker-compose logs --tail=100 web

# 带时间戳
docker-compose logs -f -t web

# 只看错误
docker-compose logs web | grep -i error
```

### Q6: 部署失败如何调试？

```bash
# 1. 查看容器状态
docker ps -a

# 2. 查看构建日志
docker-compose build

# 3. 进入容器调试
docker exec -it 9agent-pc-web sh

# 4. 检查文件是否存在
ls -la /app

# 5. 手动启动（查看详细错误）
node server.js
```

---

## 部署流程对比

| 方案 | 难度 | 速度 | 适用场景 | 推荐度 |
|------|------|------|----------|--------|
| 手动上传 | ⭐ | ⭐⭐ | 小改动、紧急修复 | ⭐⭐⭐ |
| Git 部署 | ⭐⭐ | ⭐⭐⭐ | 日常开发、版本控制 | ⭐⭐⭐⭐⭐ |
| CI/CD 自动化 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 团队协作、专业项目 | ⭐⭐⭐⭐⭐ |

---

## 推荐工作流

### 日常开发流程

```bash
# 1. 本地开发
npm run dev

# 2. 测试功能
# 访问 http://localhost:3000

# 3. 提交代码
git add .
git commit -m "feat: 添加新功能"
git push origin main

# 4. 部署到服务器
ssh root@101.201.42.83
cd /home/www/9agent-pc
git pull origin main
docker-compose up -d --build

# 5. 验证部署
# 访问 http://101.201.42.83
```

### 紧急修复流程

```bash
# 1. 修改代码
# 2. 用 Xftp 直接上传修改的文件
# 3. SSH 连接服务器
ssh root@101.201.42.83

# 4. 快速重启
cd /home/www/9agent-pc
docker-compose restart

# 5. 验证
curl http://localhost:3000
```

---

## 最佳实践

1. **使用 Git 进行版本控制**
   - 每次修改都提交
   - 写清楚提交信息
   - 定期打 tag 标记版本

2. **部署前本地测试**
   ```bash
   npm run build
   npm start
   ```

3. **保留部署日志**
   ```bash
   docker-compose logs > deploy_$(date +%Y%m%d_%H%M%S).log
   ```

4. **定期备份**
   ```bash
   # 备份代码
   tar -czf backup_$(date +%Y%m%d).tar.gz /home/www/9agent-pc
   ```

5. **使用环境变量**
   - 创建 `.env` 文件
   - 不同环境使用不同配置
   - 敏感信息不提交到 Git

---

## 快速命令参考

```bash
# === 常用部署命令 ===

# 完全重建
docker-compose down && docker-compose up -d --build

# 快速重启
docker-compose restart

# 只重建不停机
docker-compose up -d --build

# 拉取代码并部署
git pull origin main && docker-compose up -d --build

# 查看日志
docker-compose logs -f web

# 清理旧镜像
docker image prune -f

# === 调试命令 ===

# 进入容器
docker exec -it 9agent-pc-web sh

# 查看容器资源
docker stats

# 查看网络
docker network ls

# === Git 命令 ===

# 查看状态
git status

# 提交所有更改
git add . && git commit -m "update" && git push

# 查看历史
git log --oneline

# 回滚
git reset --hard HEAD~1
```

---

## 总结

**推荐流程**：

1. **日常开发**：使用 Git + 自动部署脚本
2. **紧急修复**：手动上传 + 快速重启
3. **专业项目**：配置 CI/CD 自动化

**下次更新代码时**：

```bash
# 本地
git add .
git commit -m "你的修改说明"
git push

# 服务器
ssh root@101.201.42.83
/root/deploy-9agent.sh
```

就这么简单！🚀

