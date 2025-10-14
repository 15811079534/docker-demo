# 自动部署配置指南

> 本文档说明如何配置和使用自动部署脚本

---

## 📋 目录

1. [部署脚本说明](#部署脚本说明)
2. [前置配置](#前置配置)
3. [本地部署脚本](#本地部署脚本)
4. [服务器部署脚本](#服务器部署脚本)
5. [使用方法](#使用方法)
6. [故障排除](#故障排除)

---

## 部署脚本说明

### 脚本文件清单

| 文件名 | 位置 | 用途 | 适用系统 |
|--------|------|------|----------|
| `deploy.bat` | 本地项目根目录 | 完整部署流程（带交互） | Windows |
| `quick-deploy.bat` | 本地项目根目录 | 快速部署（无交互） | Windows |
| `deploy.sh` | 本地项目根目录 | 完整部署流程（带交互） | Linux/Mac |
| `server-deploy.sh` | 服务器 `/root/` | 服务器端部署脚本 | Linux |

### 部署流程对比

**完整部署** (`deploy.bat` / `deploy.sh`)：
1. 检查 Git 状态
2. 提示输入提交信息
3. 提交并推送代码
4. 连接服务器部署
5. 验证部署结果

**快速部署** (`quick-deploy.bat`)：
1. 自动提交所有更改
2. 推送到远程仓库
3. 服务器自动部署
4. 显示结果

---

## 前置配置

### 步骤 1: 配置 SSH 免密登录

#### 1.1 生成 SSH 密钥（本地）

**Windows (PowerShell/Git Bash)**:
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

**Linux/Mac**:
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

按回车使用默认路径，可选设置密码（建议为空）。

#### 1.2 复制公钥到服务器

**方式 A：使用 ssh-copy-id（推荐，Linux/Mac）**
```bash
ssh-copy-id root@101.201.42.83
```

**方式 B：手动复制（Windows）**
```bash
# 1. 查看公钥
type %USERPROFILE%\.ssh\id_rsa.pub

# 2. 复制公钥内容

# 3. SSH 连接服务器
ssh root@101.201.42.83

# 4. 添加到 authorized_keys
mkdir -p ~/.ssh
echo "粘贴你的公钥内容" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

#### 1.3 测试免密登录

```bash
ssh root@101.201.42.83
```

如果无需输入密码即可登录，配置成功！

### 步骤 2: 配置 Git 远程仓库

#### 2.1 创建 GitHub/GitLab 仓库

在 GitHub 或 GitLab 创建一个新仓库，例如：
```
https://github.com/yourusername/9agent-pc.git
```

#### 2.2 本地配置远程仓库

**首次配置**:
```bash
cd D:\jiuxinshuzhi\doker-example\9agent-pc

# 初始化 Git（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/yourusername/9agent-pc.git

# 或使用 SSH（推荐）
git remote add origin git@github.com:yourusername/9agent-pc.git

# 首次推送
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

**已有远程仓库，更换地址**:
```bash
# 查看当前远程仓库
git remote -v

# 修改远程仓库地址
git remote set-url origin https://github.com/yourusername/9agent-pc.git
```

#### 2.3 服务器配置 Git

```bash
# SSH 连接服务器
ssh root@101.201.42.83

# 进入项目目录
cd /home/www/9agent-pc

# 初始化 Git（如果还没有）
git init

# 配置远程仓库
git remote add origin https://github.com/yourusername/9agent-pc.git

# 拉取代码
git pull origin main

# 如果有冲突，强制覆盖本地
git fetch origin
git reset --hard origin/main
```

### 步骤 3: 上传服务器部署脚本

#### 3.1 创建脚本文件

```bash
# SSH 连接服务器
ssh root@101.201.42.83

# 创建部署脚本
cat > /root/deploy-9agent.sh << 'EOF'
# 这里粘贴 server-deploy.sh 的内容
EOF

# 添加执行权限
chmod +x /root/deploy-9agent.sh
```

#### 3.2 或使用 Xftp 上传

1. 打开 Xftp 连接服务器
2. 上传 `server-deploy.sh` 到 `/root/`
3. 重命名为 `deploy-9agent.sh`
4. SSH 执行：`chmod +x /root/deploy-9agent.sh`

### 步骤 4: 创建备份目录

```bash
# SSH 连接服务器
ssh root@101.201.42.83

# 创建备份目录
mkdir -p /backup/9agent-pc
```

---

## 本地部署脚本

### deploy.bat (Windows 完整版)

**位置**: `D:\jiuxinshuzhi\doker-example\9agent-pc\deploy.bat`

**功能**:
- ✅ 检查 Git 状态
- ✅ 交互式输入提交信息
- ✅ 提交并推送代码
- ✅ SSH 连接服务器部署
- ✅ 验证部署结果

**使用方法**:
```cmd
# 在项目根目录双击运行
deploy.bat

# 或命令行运行
cd D:\jiuxinshuzhi\doker-example\9agent-pc
deploy.bat
```

### quick-deploy.bat (Windows 快速版)

**位置**: `D:\jiuxinshuzhi\doker-example\9agent-pc\quick-deploy.bat`

**功能**:
- ✅ 自动提交（默认消息）
- ✅ 自动推送
- ✅ 自动部署
- ✅ 无需任何交互

**使用方法**:
```cmd
# 直接双击运行
quick-deploy.bat
```

### deploy.sh (Linux/Mac)

**位置**: `~/projects/9agent-pc/deploy.sh`

**使用方法**:
```bash
# 添加执行权限（首次）
chmod +x deploy.sh

# 运行
./deploy.sh
```

---

## 服务器部署脚本

### server-deploy.sh

**位置**: `/root/deploy-9agent.sh`

**功能**:
- ✅ 自动备份当前版本
- ✅ 拉取最新代码
- ✅ 停止旧容器
- ✅ 构建新镜像
- ✅ 启动新容器
- ✅ 清理旧镜像
- ✅ 验证部署结果
- ✅ 失败自动回滚

**使用方法**:
```bash
# SSH 连接服务器
ssh root@101.201.42.83

# 运行部署脚本
/root/deploy-9agent.sh

# 或
cd /root
./deploy-9agent.sh
```

---

## 使用方法

### 场景 1: 日常开发更新（推荐）

**Windows**:
```cmd
# 方式 A: 完整流程（推荐）
deploy.bat

# 方式 B: 快速部署
quick-deploy.bat
```

**Linux/Mac**:
```bash
./deploy.sh
```

### 场景 2: 仅在服务器部署

```bash
# 当代码已经在服务器上，只需重新构建
ssh root@101.201.42.83
/root/deploy-9agent.sh
```

### 场景 3: 紧急修复

```bash
# 1. 修改代码
# 2. 快速部署
quick-deploy.bat

# 或手动
git add .
git commit -m "hotfix: 紧急修复"
git push origin main
ssh root@101.201.42.83 "/root/deploy-9agent.sh"
```

### 场景 4: 手动逐步部署

```bash
# 本地提交
git add .
git commit -m "feat: 新功能"
git push origin main

# 服务器部署
ssh root@101.201.42.83 << 'EOF'
cd /home/www/9agent-pc
git pull origin main
docker-compose down
docker-compose up -d --build
docker image prune -f
EOF
```

---

## 脚本详解

### deploy.bat 流程

```batch
1. 检查是否在项目根目录
   ↓
2. 显示 Git 状态
   ↓
3. 提示输入提交信息（可选）
   ↓
4. 提交代码到本地仓库
   ↓
5. 推送到远程仓库
   ↓
6. SSH 连接服务器
   ↓
7. 在服务器执行：
   - git pull
   - docker-compose down
   - docker-compose up -d --build
   - docker image prune -f
   ↓
8. 显示部署结果
```

### server-deploy.sh 流程

```bash
1. 检查项目目录
   ↓
2. 备份当前版本（保留最近5个）
   ↓
3. 拉取最新代码（如果是 Git 项目）
   ↓
4. 停止旧容器
   ↓
5. 构建新镜像（--no-cache 确保最新）
   ↓
6. 启动新容器
   ↓
7. 清理旧镜像
   ↓
8. 等待服务启动（5秒）
   ↓
9. 验证部署（curl 检查 HTTP 200）
   ↓
10. 显示部署结果和容器状态
```

---

## 故障排除

### 问题 1: SSH 连接失败

**错误信息**:
```
ssh: connect to host 101.201.42.83 port 22: Connection refused
```

**解决方案**:
```bash
# 1. 检查服务器是否可达
ping 101.201.42.83

# 2. 检查 SSH 服务
ssh -v root@101.201.42.83

# 3. 检查防火墙
# 在服务器上执行
firewall-cmd --list-all | grep ssh
```

### 问题 2: Git 推送失败

**错误信息**:
```
fatal: remote origin already exists
```

**解决方案**:
```bash
# 查看远程仓库
git remote -v

# 删除旧的
git remote remove origin

# 重新添加
git remote add origin https://github.com/yourusername/9agent-pc.git
```

### 问题 3: 权限被拒绝

**错误信息**:
```
Permission denied (publickey)
```

**解决方案**:
```bash
# 1. 检查 SSH 密钥
ls -la ~/.ssh/

# 2. 重新配置免密登录
ssh-copy-id root@101.201.42.83

# 3. 检查密钥权限
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
```

### 问题 4: Docker 构建失败

**错误信息**:
```
ERROR: failed to solve: process "/bin/sh -c npm run build" did not complete successfully
```

**解决方案**:
```bash
# 1. 查看详细日志
docker-compose build --no-cache

# 2. 进入容器调试
docker run -it --rm 9agent-pc-web sh

# 3. 检查 next.config.ts 配置
# 确保有 output: 'standalone'
```

### 问题 5: 部署后访问 404

**解决方案**:
```bash
# 1. 检查容器日志
docker-compose logs -f web

# 2. 检查 Nginx 配置
nginx -t

# 3. 重启 Nginx
systemctl reload nginx

# 4. 检查端口
netstat -tulnp | grep :3000
```

### 问题 6: 脚本运行错误

**Windows - 中文乱码**:
```batch
# 在脚本开头添加
chcp 65001 >nul
```

**Linux - 没有执行权限**:
```bash
chmod +x deploy.sh
chmod +x /root/deploy-9agent.sh
```

**换行符问题（Windows 转 Linux）**:
```bash
# 转换换行符
dos2unix deploy.sh
# 或
sed -i 's/\r$//' deploy.sh
```

---

## 高级配置

### 1. 配置部署通知

在 `server-deploy.sh` 末尾添加：

```bash
# 企业微信通知
curl -s 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=YOUR_KEY' \
   -H 'Content-Type: application/json' \
   -d '{"msgtype": "text","text": {"content": "✅ 9Agent PC 部署成功！"}}'

# 钉钉通知
curl -s 'https://oapi.dingtalk.com/robot/send?access_token=YOUR_TOKEN' \
   -H 'Content-Type: application/json' \
   -d '{"msgtype": "text","text": {"content": "✅ 9Agent PC 部署成功！"}}'
```

### 2. 配置定时备份

```bash
# 创建备份脚本
cat > /root/backup-9agent.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backup/9agent-pc"
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" /home/www/9agent-pc
# 保留最近30天
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +30 -delete
echo "备份完成: backup_$DATE.tar.gz"
EOF

chmod +x /root/backup-9agent.sh

# 添加到 crontab（每天凌晨2点）
echo "0 2 * * * /root/backup-9agent.sh" | crontab -
```

### 3. 配置健康检查

在 `server-deploy.sh` 添加：

```bash
# 健康检查函数
check_health() {
    local max_attempts=10
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
        if [ "$HTTP_CODE" == "200" ]; then
            echo -e "${GREEN}✅ 服务健康${NC}"
            return 0
        fi
        echo -e "${YELLOW}⏳ 等待服务启动... ($attempt/$max_attempts)${NC}"
        sleep 3
        attempt=$((attempt + 1))
    done
    
    echo -e "${RED}❌ 服务启动超时${NC}"
    return 1
}

# 使用
if check_health; then
    echo "部署成功"
else
    echo "部署失败，回滚..."
    docker-compose down
    # 恢复备份逻辑
fi
```

### 4. 配置多环境部署

创建 `deploy-env.sh`:

```bash
#!/bin/bash

# 选择环境
echo "选择部署环境："
echo "1) 开发环境 (dev)"
echo "2) 测试环境 (staging)"
echo "3) 生产环境 (production)"
read -p "请选择 [1-3]: " env_choice

case $env_choice in
    1)
        ENV="dev"
        SERVER="dev.9agent.net"
        ;;
    2)
        ENV="staging"
        SERVER="staging.9agent.net"
        ;;
    3)
        ENV="production"
        SERVER="101.201.42.83"
        ;;
    *)
        echo "无效选择"
        exit 1
        ;;
esac

echo "部署到 $ENV 环境 ($SERVER)..."

# 部署逻辑
ssh root@$SERVER << EOF
    cd /home/www/9agent-pc
    git pull origin $ENV
    docker-compose -f docker-compose.$ENV.yml up -d --build
EOF
```

---

## 最佳实践

### 1. 部署前检查清单

- [ ] 本地测试通过（`npm run dev`）
- [ ] 本地构建成功（`npm run build`）
- [ ] 代码已提交到 Git
- [ ] 提交信息清晰明确
- [ ] 备份了重要数据
- [ ] 确认是否需要数据库迁移

### 2. 安全建议

```bash
# 1. 使用 SSH 密钥而非密码
# 2. 定期轮换密钥
ssh-keygen -t rsa -b 4096 -C "new_key_$(date +%Y%m%d)"

# 3. 限制 SSH 访问
# 编辑 /etc/ssh/sshd_config
PermitRootLogin prohibit-password
PasswordAuthentication no

# 4. 使用防火墙
firewall-cmd --add-rich-rule='rule family="ipv4" source address="你的IP" port protocol="tcp" port="22" accept' --permanent
```

### 3. 性能优化

```bash
# 1. 使用国内镜像源
cat > .npmrc << EOF
registry=https://registry.npmmirror.com
EOF

# 2. Docker 构建优化
# 使用构建缓存
docker-compose build --parallel

# 3. 清理磁盘空间
docker system prune -a --volumes -f
```

### 4. 监控告警

```bash
# 1. 容器状态监控
watch -n 5 'docker-compose ps'

# 2. 资源监控
docker stats

# 3. 日志监控
tail -f /var/log/messages | grep docker
```

---

## 快速参考

### 常用命令速查

```bash
# === 本地操作 ===

# 完整部署（Windows）
deploy.bat

# 快速部署（Windows）
quick-deploy.bat

# 完整部署（Linux/Mac）
./deploy.sh

# === 服务器操作 ===

# 部署
/root/deploy-9agent.sh

# 查看日志
docker-compose -f /home/www/9agent-pc/docker-compose.yml logs -f

# 重启服务
docker-compose -f /home/www/9agent-pc/docker-compose.yml restart

# 查看状态
docker-compose -f /home/www/9agent-pc/docker-compose.yml ps

# === Git 操作 ===

# 提交并推送
git add . && git commit -m "update" && git push

# 查看状态
git status

# 查看历史
git log --oneline

# === Docker 操作 ===

# 查看容器
docker ps

# 查看日志
docker logs 9agent-pc-web

# 进入容器
docker exec -it 9agent-pc-web sh

# 清理资源
docker system prune -a -f
```

### 脚本文件位置

```
# 本地（Windows）
D:\jiuxinshuzhi\doker-example\9agent-pc\
├── deploy.bat           # 完整部署脚本
├── quick-deploy.bat     # 快速部署脚本
└── deploy.sh            # Linux/Mac 部署脚本

# 服务器
/root/
└── deploy-9agent.sh     # 服务器部署脚本

/home/www/9agent-pc/
└── (项目文件)

/backup/9agent-pc/
└── (备份文件)
```

---

## 更新日志

### 2025-10-13
- ✅ 创建本地部署脚本（Windows & Linux）
- ✅ 创建服务器部署脚本
- ✅ 配置 SSH 免密登录
- ✅ 配置 Git 远程仓库
- ✅ 添加自动备份功能
- ✅ 添加部署验证功能
- ✅ 编写完整配置文档

---

## 总结

现在你拥有了完整的自动化部署方案：

### 🚀 日常使用（推荐）

**Windows 用户**:
```cmd
# 双击运行即可
deploy.bat
```

**Linux/Mac 用户**:
```bash
./deploy.sh
```

### ⚡ 快速部署

```cmd
# 一键部署，无需交互
quick-deploy.bat
```

### 🔧 服务器维护

```bash
ssh root@101.201.42.83
/root/deploy-9agent.sh
```

**就这么简单！** 🎉

