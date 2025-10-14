# 🐳 本地 Docker Desktop 使用指南

## 📋 前提条件

- ✅ 已安装 Docker Desktop
- ✅ Docker Desktop 正在运行

---

## 🚀 快速开始

### 1️⃣ 本地测试（使用开发配置）

```bash
# 构建并启动（首次或代码有更新时）
docker-compose -f docker-compose.dev.yml up -d --build

# 仅启动（镜像已存在）
docker-compose -f docker-compose.dev.yml up -d

# 访问
http://localhost:3000
```

### 2️⃣ 查看日志

```bash
# 实时查看日志
docker-compose -f docker-compose.dev.yml logs -f

# 查看最近 100 行
docker-compose -f docker-compose.dev.yml logs --tail=100

# 只看错误日志
docker-compose -f docker-compose.dev.yml logs -f | findstr "error"
```

### 3️⃣ 停止和清理

```bash
# 停止容器（保留镜像）
docker-compose -f docker-compose.dev.yml down

# 停止并删除镜像
docker-compose -f docker-compose.dev.yml down --rmi all

# 停止并删除所有数据（包括 volumes）
docker-compose -f docker-compose.dev.yml down -v
```

### 4️⃣ 重启容器

```bash
# 重启
docker-compose -f docker-compose.dev.yml restart

# 重新构建并重启
docker-compose -f docker-compose.dev.yml up -d --build --force-recreate
```

---

## 🔧 常用 Docker 命令

### 查看状态

```bash
# 查看运行中的容器
docker ps

# 查看所有容器（包括停止的）
docker ps -a

# 查看镜像
docker images

# 查看资源使用情况
docker stats
```

### 容器操作

```bash
# 进入容器（调试用）
docker exec -it 9agent-pc-dev sh

# 查看容器日志
docker logs 9agent-pc-dev

# 查看容器详细信息
docker inspect 9agent-pc-dev
```

### 清理命令

```bash
# 清理未使用的镜像
docker image prune

# 清理所有未使用的资源（镜像、容器、网络）
docker system prune

# 清理所有（包括 volumes，慎用！）
docker system prune -a --volumes
```

---

## 📊 完整工作流

### 方式 A：本地测试 → 服务器部署

```bash
# 1. 本地构建测试
docker-compose -f docker-compose.dev.yml up -d --build

# 2. 访问测试
# 浏览器打开 http://localhost:3000

# 3. 测试通过后停止本地
docker-compose -f docker-compose.dev.yml down

# 4. 部署到服务器
deploy.bat
```

### 方式 B：直接部署（不本地测试）

```bash
# 直接部署到服务器
deploy.bat
```

---

## 🎯 推荐工作流程

### 日常开发

```bash
# 1. 修改代码
# 编辑文件...

# 2. 本地 Docker 测试
docker-compose -f docker-compose.dev.yml up -d --build

# 3. 查看效果
# http://localhost:3000

# 4. 查看日志（如有问题）
docker-compose -f docker-compose.dev.yml logs -f

# 5. 测试通过，停止本地
docker-compose -f docker-compose.dev.yml down

# 6. 部署到服务器
deploy.bat
```

### 快速迭代（跳过本地测试）

```bash
# 修改代码后直接部署
deploy.bat
```

---

## 💡 实用技巧

### 1. 快速重建

```bash
# 完全重建（清除缓存）
docker-compose -f docker-compose.dev.yml build --no-cache
docker-compose -f docker-compose.dev.yml up -d
```

### 2. 查看构建过程

```bash
# 不使用 -d 参数，前台运行查看详细日志
docker-compose -f docker-compose.dev.yml up --build
```

### 3. 只构建不启动

```bash
docker-compose -f docker-compose.dev.yml build
```

### 4. 强制重新创建容器

```bash
docker-compose -f docker-compose.dev.yml up -d --force-recreate
```

---

## 🔍 故障排查

### 问题 1：端口被占用

```bash
# 查看端口占用
netstat -ano | findstr :3000

# 或修改端口（编辑 docker-compose.dev.yml）
ports:
  - "3001:3000"  # 本地访问 3001，容器内部 3000
```

### 问题 2：构建失败

```bash
# 查看详细构建日志
docker-compose -f docker-compose.dev.yml build --no-cache --progress=plain

# 清理后重试
docker system prune -f
docker-compose -f docker-compose.dev.yml build --no-cache
```

### 问题 3：容器启动失败

```bash
# 查看容器日志
docker logs 9agent-pc-dev

# 查看容器状态
docker inspect 9agent-pc-dev
```

### 问题 4：网站无法访问

```bash
# 1. 检查容器是否运行
docker ps | findstr 9agent-pc-dev

# 2. 检查端口映射
docker port 9agent-pc-dev

# 3. 查看日志
docker logs 9agent-pc-dev

# 4. 测试容器内网络
docker exec -it 9agent-pc-dev wget -O- http://localhost:3000
```

---

## 📝 配置文件说明

### docker-compose.dev.yml（本地测试）

```yaml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"        # 本地端口:容器端口
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    container_name: 9agent-pc-dev
    volumes:
      - ./logs:/app/logs   # 可选：日志挂载
```

### docker-compose.yml（服务器生产）

```yaml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    container_name: 9agent-app
```

---

## 🎨 进阶用法

### 1. 同时运行多个版本

```bash
# 本地测试版（端口 3000）
docker-compose -f docker-compose.dev.yml up -d

# 另一个测试版（端口 3001）
# 修改 docker-compose.dev.yml 的端口和容器名
docker-compose -f docker-compose.dev2.yml up -d
```

### 2. 挂载代码实现热更新（开发模式）

创建 `docker-compose.hotreload.yml`：

```yaml
version: '3.8'

services:
  web:
    image: node:20-alpine
    working_dir: /app
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    command: sh -c "npm install && npm run dev"
    environment:
      - NODE_ENV=development
    container_name: 9agent-pc-hotreload
```

使用：

```bash
docker-compose -f docker-compose.hotreload.yml up
```

### 3. 查看镜像大小

```bash
docker images | findstr 9agent
```

### 4. 导出镜像（备份）

```bash
# 导出镜像
docker save -o 9agent-pc.tar 9agent-pc-web

# 导入镜像
docker load -i 9agent-pc.tar
```

---

## 📊 性能监控

### 查看资源使用

```bash
# 实时监控
docker stats 9agent-pc-dev

# 查看容器进程
docker top 9agent-pc-dev
```

### 查看镜像层

```bash
docker history 9agent-pc-web
```

---

## 🔗 快速命令速查表

| 操作 | 命令 |
|------|------|
| **启动** | `docker-compose -f docker-compose.dev.yml up -d` |
| **重建启动** | `docker-compose -f docker-compose.dev.yml up -d --build` |
| **停止** | `docker-compose -f docker-compose.dev.yml down` |
| **重启** | `docker-compose -f docker-compose.dev.yml restart` |
| **查看日志** | `docker-compose -f docker-compose.dev.yml logs -f` |
| **查看状态** | `docker ps` |
| **进入容器** | `docker exec -it 9agent-pc-dev sh` |
| **清理镜像** | `docker image prune` |
| **完全清理** | `docker system prune -a` |

---

## 🎯 最佳实践

### 1. 开发流程

```bash
# 开发时使用热更新模式（不用 Docker）
npm run dev

# 测试生产环境时使用 Docker
docker-compose -f docker-compose.dev.yml up -d --build

# 确认无误后部署
deploy.bat
```

### 2. 定期清理

```bash
# 每周清理一次未使用的镜像
docker image prune -f

# 每月深度清理
docker system prune -a -f
```

### 3. 版本管理

```bash
# 给镜像打标签
docker tag 9agent-pc-web:latest 9agent-pc-web:v1.0.0

# 查看所有版本
docker images | findstr 9agent-pc-web
```

---

## 📞 需要帮助？

- Docker 官方文档：https://docs.docker.com/
- Docker Compose 文档：https://docs.docker.com/compose/
- Next.js Docker 部署：https://nextjs.org/docs/deployment#docker-image

---

## 🎉 开始使用

```bash
# 1. 确保 Docker Desktop 运行中
docker version

# 2. 构建并启动
docker-compose -f docker-compose.dev.yml up -d --build

# 3. 访问
http://localhost:3000

# 4. 查看日志
docker-compose -f docker-compose.dev.yml logs -f
```

**就这么简单！** 🚀

