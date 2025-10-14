# 🎯 部署文档总览

> 本项目的所有部署相关文档和脚本汇总

---

## 📚 文档清单

### 1. 核心部署文档

| 文档 | 说明 | 适用场景 |
|------|------|----------|
| **[QUICK_START.md](./QUICK_START.md)** | ⭐ **快速开始指南** | 首次使用必读 |
| **[AUTO_DEPLOY_GUIDE.md](./AUTO_DEPLOY_GUIDE.md)** | 自动部署完整配置 | 配置自动化部署 |
| **[DOCKER_DEPLOYMENT_GUIDE.md](./DOCKER_DEPLOYMENT_GUIDE.md)** | Docker 部署完整指南 | 了解部署架构 |
| **[UPDATE_DEPLOYMENT_GUIDE.md](./UPDATE_DEPLOYMENT_GUIDE.md)** | 代码更新部署指南 | 日常更新代码 |

### 2. 快速参考

- **新手入门**: 先看 [QUICK_START.md](./QUICK_START.md)
- **完整配置**: 参考 [AUTO_DEPLOY_GUIDE.md](./AUTO_DEPLOY_GUIDE.md)
- **故障排查**: 查看 [DOCKER_DEPLOYMENT_GUIDE.md](./DOCKER_DEPLOYMENT_GUIDE.md)
- **更新方法**: 查阅 [UPDATE_DEPLOYMENT_GUIDE.md](./UPDATE_DEPLOYMENT_GUIDE.md)

---

## 🚀 部署脚本

### 本地脚本（项目根目录）

| 脚本文件 | 系统 | 功能 | 使用方法 |
|----------|------|------|----------|
| `deploy.bat` | Windows | 完整部署流程 | 双击运行 |
| `quick-deploy.bat` | Windows | 快速部署（无交互） | 双击运行 |
| `deploy.sh` | Linux/Mac | 完整部署流程 | `./deploy.sh` |

### 服务器脚本

| 脚本文件 | 位置 | 功能 | 使用方法 |
|----------|------|------|----------|
| `server-deploy.sh` | 本地项目 | 服务器部署脚本模板 | 上传到服务器 `/root/deploy-9agent.sh` |

---

## ⚡ 5 分钟快速部署

### 第一次部署（配置阶段）

#### 1. 配置 SSH 免密登录

```bash
# Windows (PowerShell)
ssh-keygen -t rsa -b 4096
type %USERPROFILE%\.ssh\id_rsa.pub

# 复制公钥，然后在服务器执行
ssh root@101.201.42.83
mkdir -p ~/.ssh
echo "你的公钥" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

#### 2. 上传服务器脚本

**方式 A: 使用 Xftp**
- 上传 `server-deploy.sh` → `/root/deploy-9agent.sh`
- SSH 执行: `chmod +x /root/deploy-9agent.sh`

**方式 B: 手动创建**
```bash
ssh root@101.201.42.83
nano /root/deploy-9agent.sh
# 粘贴 server-deploy.sh 内容
chmod +x /root/deploy-9agent.sh
```

#### 3. 配置 Git（可选）

```bash
# 本地
git remote add origin https://github.com/yourusername/9agent-pc.git
git push -u origin main

# 服务器
ssh root@101.201.42.83
cd /home/www/9agent-pc
git remote add origin https://github.com/yourusername/9agent-pc.git
```

### 日常部署（1分钟）

```cmd
# Windows - 双击运行
deploy.bat
```

```bash
# Linux/Mac
./deploy.sh
```

---

## 🎯 部署方案对比

| 方案 | 配置难度 | 部署速度 | 适用场景 | 推荐度 |
|------|----------|----------|----------|--------|
| **手动上传** | ⭐ | ⭐⭐ | 小改动、紧急修复 | ⭐⭐⭐ |
| **脚本部署** | ⭐⭐ | ⭐⭐⭐⭐ | 日常开发 | ⭐⭐⭐⭐⭐ |
| **Git 自动部署** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 团队协作 | ⭐⭐⭐⭐⭐ |
| **CI/CD** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 专业项目 | ⭐⭐⭐⭐⭐ |

---

## 📖 使用场景指南

### 场景 1: 我是新手，第一次部署

1. 阅读 [QUICK_START.md](./QUICK_START.md)
2. 按步骤配置 SSH 免密登录
3. 上传服务器脚本
4. 运行 `deploy.bat`

### 场景 2: 我要更新代码

```cmd
# 最简单的方式
deploy.bat

# 或快速部署
quick-deploy.bat
```

### 场景 3: 我要了解部署原理

阅读 [DOCKER_DEPLOYMENT_GUIDE.md](./DOCKER_DEPLOYMENT_GUIDE.md)

### 场景 4: 部署出错了

1. 查看 [AUTO_DEPLOY_GUIDE.md](./AUTO_DEPLOY_GUIDE.md) 的"故障排除"章节
2. 或参考 [DOCKER_DEPLOYMENT_GUIDE.md](./DOCKER_DEPLOYMENT_GUIDE.md) 的"问题排查"

### 场景 5: 我要配置 CI/CD

参考 [UPDATE_DEPLOYMENT_GUIDE.md](./UPDATE_DEPLOYMENT_GUIDE.md) 的"方案三"

---

## 🔥 推荐工作流

### 日常开发流程

```bash
# 1. 本地开发和测试
npm run dev

# 2. 修改代码
# ...

# 3. 一键部署（Windows）
deploy.bat

# 4. 验证
# 访问 http://101.201.42.83
```

### 紧急修复流程

```bash
# 1. 快速修复代码
# 2. 快速部署（无需输入任何内容）
quick-deploy.bat
```

### 团队协作流程

```bash
# 开发者
git checkout -b feature/new-feature
# 开发...
git commit -m "feat: 新功能"
git push origin feature/new-feature

# 合并到主分支后
# 运维人员
ssh root@101.201.42.83
/root/deploy-9agent.sh
```

---

## 🛠️ 常用命令速查

### 部署命令

```bash
# === 本地部署 ===
deploy.bat              # Windows 完整部署
quick-deploy.bat        # Windows 快速部署
./deploy.sh             # Linux/Mac 部署

# === 服务器部署 ===
ssh root@101.201.42.83
/root/deploy-9agent.sh  # 服务器端部署

# === 手动部署 ===
cd /home/www/9agent-pc
git pull origin main
docker-compose down
docker-compose up -d --build
docker image prune -f
```

### 监控命令

```bash
# 查看容器状态
docker ps

# 查看日志
docker-compose -f /home/www/9agent-pc/docker-compose.yml logs -f

# 查看资源使用
docker stats

# 进入容器
docker exec -it 9agent-pc-web sh
```

### 故障排查

```bash
# 测试 SSH 连接
ssh root@101.201.42.83

# 检查 Nginx
nginx -t
systemctl status nginx

# 检查端口
netstat -tulnp | grep :3000
netstat -tulnp | grep :80

# 查看容器日志
docker logs 9agent-pc-web
```

---

## 📊 部署架构

```
开发者本地
    ↓
运行 deploy.bat
    ↓
Git 提交和推送
    ↓
SSH 连接服务器
    ↓
服务器拉取代码
    ↓
Docker 构建镜像
    ↓
启动容器（端口 3000）
    ↓
Nginx 反向代理（端口 80）
    ↓
用户访问网站
```

### 技术栈

- **前端**: Next.js 15 + React 19 + TypeScript
- **容器化**: Docker + Docker Compose
- **Web服务器**: Nginx
- **版本控制**: Git
- **部署方式**: 自动化脚本

---

## 🎯 部署文件清单

### 核心配置文件

```
项目根目录/
├── Dockerfile              # Docker 构建文件
├── docker-compose.yml      # Docker 编排配置
├── next.config.ts          # Next.js 配置（含 standalone 输出）
├── package.json            # 项目依赖
└── .dockerignore          # Docker 忽略文件
```

### 部署脚本

```
项目根目录/
├── deploy.bat             # Windows 部署脚本
├── quick-deploy.bat       # Windows 快速部署
├── deploy.sh              # Linux/Mac 部署脚本
└── server-deploy.sh       # 服务器部署脚本模板
```

### 部署文档

```
项目根目录/
├── QUICK_START.md                    # ⭐ 快速开始
├── AUTO_DEPLOY_GUIDE.md              # 自动部署指南
├── DOCKER_DEPLOYMENT_GUIDE.md        # Docker 部署指南
├── UPDATE_DEPLOYMENT_GUIDE.md        # 更新部署指南
└── DEPLOYMENT_SUMMARY.md             # 本文档
```

### 服务器文件

```
/root/
└── deploy-9agent.sh       # 部署脚本

/home/www/9agent-pc/
└── (项目文件)

/backup/9agent-pc/
└── backup_*.tar.gz        # 自动备份

/etc/nginx/conf.d/
└── 9agent.conf           # Nginx 配置
```

---

## ✅ 配置检查清单

### 首次部署前

- [ ] SSH 免密登录已配置
- [ ] 服务器脚本已上传到 `/root/deploy-9agent.sh`
- [ ] 服务器脚本有执行权限 (`chmod +x`)
- [ ] Git 远程仓库已配置（如需要）
- [ ] Docker 和 Docker Compose 已安装
- [ ] Nginx 已安装并配置
- [ ] 防火墙已开放 80 和 3000 端口
- [ ] 项目在服务器 `/home/www/9agent-pc/` 目录

### 每次部署前

- [ ] 本地代码已测试 (`npm run dev`)
- [ ] 本地构建成功 (`npm run build`)
- [ ] Git 状态已检查 (`git status`)
- [ ] 提交信息准备好
- [ ] 备份了重要数据（可选）

### 部署后验证

- [ ] 网站可以访问 (http://101.201.42.83)
- [ ] 容器运行正常 (`docker ps`)
- [ ] 日志无错误 (`docker-compose logs`)
- [ ] Nginx 运行正常 (`systemctl status nginx`)
- [ ] 功能测试通过

---

## 🆘 紧急情况处理

### 部署失败

```bash
# 1. 查看日志
ssh root@101.201.42.83
docker-compose -f /home/www/9agent-pc/docker-compose.yml logs -f

# 2. 检查容器状态
docker ps -a

# 3. 重新部署
/root/deploy-9agent.sh
```

### 网站无法访问

```bash
# 1. 检查容器
docker ps

# 2. 检查 Nginx
nginx -t
systemctl status nginx

# 3. 检查端口
netstat -tulnp | grep :80
netstat -tulnp | grep :3000

# 4. 重启服务
systemctl restart nginx
docker-compose restart
```

### 回滚到上一版本

```bash
# 方式 A: 使用备份
cd /home/www/9agent-pc
docker-compose down
tar -xzf /backup/9agent-pc/backup_XXXXXXXX_XXXXXX.tar.gz
docker-compose up -d --build

# 方式 B: 使用 Git
git log --oneline
git checkout <commit-hash>
docker-compose down
docker-compose up -d --build
```

---

## 📈 性能优化建议

### 1. 构建优化

```bash
# 使用国内镜像
echo "registry=https://registry.npmmirror.com" > .npmrc
```

### 2. 运行优化

```yaml
# docker-compose.yml 添加资源限制
services:
  web:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
```

### 3. Nginx 优化

```nginx
# 启用 Gzip
gzip on;
gzip_types text/plain text/css application/json application/javascript;

# 静态资源缓存
location /_next/static {
    expires 365d;
    add_header Cache-Control "public, immutable";
}
```

---

## 🔐 安全建议

1. **使用 SSH 密钥**（不用密码）
2. **配置防火墙**（只开放必要端口）
3. **定期更新系统**（`yum update -y`）
4. **配置 HTTPS**（使用 Let's Encrypt）
5. **限制 SSH 访问**（只允许特定 IP）
6. **定期备份**（自动化备份脚本）

---

## 📞 获取帮助

### 文档导航

- **快速上手**: [QUICK_START.md](./QUICK_START.md)
- **详细配置**: [AUTO_DEPLOY_GUIDE.md](./AUTO_DEPLOY_GUIDE.md)
- **Docker 相关**: [DOCKER_DEPLOYMENT_GUIDE.md](./DOCKER_DEPLOYMENT_GUIDE.md)
- **更新相关**: [UPDATE_DEPLOYMENT_GUIDE.md](./UPDATE_DEPLOYMENT_GUIDE.md)

### 常见问题快速跳转

- SSH 连接问题 → [AUTO_DEPLOY_GUIDE.md](./AUTO_DEPLOY_GUIDE.md#问题-1-ssh-连接失败)
- Git 推送问题 → [AUTO_DEPLOY_GUIDE.md](./AUTO_DEPLOY_GUIDE.md#问题-2-git-推送失败)
- Docker 构建问题 → [DOCKER_DEPLOYMENT_GUIDE.md](./DOCKER_DEPLOYMENT_GUIDE.md#问题-2-缺少-standalone-输出)
- 部署验证问题 → [DOCKER_DEPLOYMENT_GUIDE.md](./DOCKER_DEPLOYMENT_GUIDE.md#第六步验证部署)

---

## 🎉 总结

### 你现在拥有：

✅ **4 份详细文档**
- 快速开始指南
- 自动部署配置指南  
- Docker 部署完整指南
- 代码更新部署指南

✅ **4 个部署脚本**
- Windows 完整部署脚本
- Windows 快速部署脚本
- Linux/Mac 部署脚本
- 服务器端部署脚本

✅ **完整的部署方案**
- 从配置到使用
- 从开发到生产
- 从部署到监控

### 现在开始使用：

```cmd
# Windows 用户 - 双击即可
deploy.bat
```

```bash
# Linux/Mac 用户
./deploy.sh
```

**就这么简单！** 🚀

---

**项目信息**:
- **网站地址**: http://101.201.42.83
- **项目路径**: D:\jiuxinshuzhi\doker-example\9agent-pc
- **服务器**: 101.201.42.83
- **部署时间**: 2025-10-13

**文档更新**: 2025-10-13

