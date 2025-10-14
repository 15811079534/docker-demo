# 🚀 快速开始 - 自动部署

> 5分钟配置，1分钟部署！

---

## ⚡ 超级快速开始

### Windows 用户（最简单）

1. **双击运行部署脚本**
   ```
   deploy.bat
   ```

2. **输入提交信息**（或直接回车）

3. **等待部署完成** ✅

就这么简单！🎉

---

## 📦 脚本说明

### 本地脚本（在项目根目录）

| 文件 | 用途 | 使用场景 |
|------|------|----------|
| `deploy.bat` | 完整部署（带交互） | 日常开发更新 |
| `quick-deploy.bat` | 快速部署（无交互） | 紧急修复 |
| `deploy.sh` | Linux/Mac 部署 | 非 Windows 系统 |

### 服务器脚本

| 文件 | 位置 | 用途 |
|------|------|------|
| `server-deploy.sh` | 上传到服务器 `/root/deploy-9agent.sh` | 服务器端部署 |

---

## 🔧 首次配置（仅需一次）

### 步骤 1: 配置 SSH 免密登录

```bash
# 1. 生成 SSH 密钥（本地，如果还没有）
ssh-keygen -t rsa -b 4096

# 2. 复制公钥到服务器（Windows 用户手动复制）
type %USERPROFILE%\.ssh\id_rsa.pub

# 3. 在服务器上添加公钥
ssh root@101.201.42.83
mkdir -p ~/.ssh
echo "你的公钥内容" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# 4. 测试免密登录
ssh root@101.201.42.83
```

### 步骤 2: 配置 Git 远程仓库（可选）

```bash
# 如果要使用 Git 自动同步
git remote add origin https://github.com/yourusername/9agent-pc.git
git push -u origin main
```

### 步骤 3: 上传服务器脚本

**方式 A：使用 Xftp**
1. 上传 `server-deploy.sh` 到 `/root/`
2. 重命名为 `deploy-9agent.sh`
3. SSH 执行：`chmod +x /root/deploy-9agent.sh`

**方式 B：直接创建**
```bash
ssh root@101.201.42.83
# 粘贴 server-deploy.sh 内容到 /root/deploy-9agent.sh
chmod +x /root/deploy-9agent.sh
```

---

## 💡 使用方法

### 场景 1: 日常更新（推荐）

**Windows**:
```cmd
# 双击运行
deploy.bat

# 或命令行
cd D:\jiuxinshuzhi\doker-example\9agent-pc
deploy.bat
```

**Linux/Mac**:
```bash
./deploy.sh
```

### 场景 2: 快速部署

```cmd
# 无需任何输入，自动完成
quick-deploy.bat
```

### 场景 3: 仅服务器部署

```bash
ssh root@101.201.42.83
/root/deploy-9agent.sh
```

---

## ❓ 常见问题

### Q1: 脚本运行报错怎么办？

**检查 SSH 连接**:
```bash
ssh root@101.201.42.83
```

如果需要密码，说明免密登录未配置，请参考"步骤1"。

### Q2: Git 推送失败？

```bash
# 检查远程仓库
git remote -v

# 如果没有，添加
git remote add origin https://github.com/yourusername/9agent-pc.git
```

### Q3: 部署后网站没更新？

```bash
# 硬刷新浏览器
Ctrl + F5

# 或清除浏览器缓存
```

### Q4: 想要查看详细日志？

```bash
ssh root@101.201.42.83
docker-compose -f /home/www/9agent-pc/docker-compose.yml logs -f
```

---

## 📚 完整文档

- **[AUTO_DEPLOY_GUIDE.md](./AUTO_DEPLOY_GUIDE.md)** - 完整的自动部署配置指南
- **[DOCKER_DEPLOYMENT_GUIDE.md](./DOCKER_DEPLOYMENT_GUIDE.md)** - Docker 部署完整指南
- **[UPDATE_DEPLOYMENT_GUIDE.md](./UPDATE_DEPLOYMENT_GUIDE.md)** - 代码更新部署指南

---

## 🎯 部署流程图

```
本地修改代码
    ↓
运行 deploy.bat
    ↓
自动提交到 Git
    ↓
自动推送到远程仓库
    ↓
SSH 连接服务器
    ↓
拉取最新代码
    ↓
Docker 重新构建
    ↓
自动启动容器
    ↓
清理旧镜像
    ↓
部署完成！✅
```

---

## ⚙️ 脚本功能

### deploy.bat 做了什么？

1. ✅ 检查 Git 状态
2. ✅ 提交代码（可输入提交信息）
3. ✅ 推送到远程仓库
4. ✅ SSH 连接服务器
5. ✅ 执行部署命令：
   - `git pull` - 拉取代码
   - `docker-compose down` - 停止容器
   - `docker-compose up -d --build` - 重新构建并启动
   - `docker image prune -f` - 清理旧镜像
6. ✅ 显示部署结果

### server-deploy.sh 做了什么？

1. ✅ 自动备份当前版本
2. ✅ 拉取最新代码
3. ✅ 停止旧容器
4. ✅ 构建新镜像
5. ✅ 启动新容器
6. ✅ 清理旧镜像
7. ✅ 健康检查
8. ✅ 失败自动回滚

---

## 🌟 最佳实践

### 1. 部署前

- 本地测试：`npm run dev`
- 本地构建：`npm run build`
- 检查改动：`git status`

### 2. 部署中

- 使用 `deploy.bat`（有交互，更安全）
- 或 `quick-deploy.bat`（快速，适合紧急）

### 3. 部署后

- 验证网站：http://101.201.42.83
- 查看日志：`docker-compose logs -f`
- 检查状态：`docker ps`

---

## 🆘 紧急回滚

```bash
# SSH 连接服务器
ssh root@101.201.42.83

# 查看备份
ls -lh /backup/9agent-pc/

# 恢复备份
cd /home/www/9agent-pc
tar -xzf /backup/9agent-pc/backup_XXXXXXXX_XXXXXX.tar.gz

# 重新部署
docker-compose down
docker-compose up -d --build
```

---

## 📞 获取帮助

- **查看完整文档**: [AUTO_DEPLOY_GUIDE.md](./AUTO_DEPLOY_GUIDE.md)
- **Docker 问题**: [DOCKER_DEPLOYMENT_GUIDE.md](./DOCKER_DEPLOYMENT_GUIDE.md)
- **更新问题**: [UPDATE_DEPLOYMENT_GUIDE.md](./UPDATE_DEPLOYMENT_GUIDE.md)

---

## ✅ 配置检查清单

部署前请确认：

- [ ] SSH 免密登录已配置
- [ ] Git 远程仓库已配置（如需要）
- [ ] 服务器脚本已上传
- [ ] 本地脚本在项目根目录
- [ ] Docker 服务运行正常

---

**现在开始使用吧！** 🚀

```cmd
# Windows 用户，直接运行
deploy.bat
```

```bash
# Linux/Mac 用户
./deploy.sh
```

