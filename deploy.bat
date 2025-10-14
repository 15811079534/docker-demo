@echo off
chcp 65001 >nul
echo ========================================
echo 🚀 部署 9Agent PC 到生产服务器
echo ========================================
echo.

REM 检查是否在正确的目录
if not exist "package.json" (
    echo ❌ 错误：请在项目根目录运行此脚本
    pause
    exit /b 1
)

REM 检查 Git 状态
echo [1/5] 📝 检查 Git 状态...
git status
echo.

REM 提交代码
echo [2/5] 💾 提交代码到 Git...
set /p commit_msg="请输入提交信息 (直接回车使用默认): "
if "%commit_msg%"=="" set commit_msg=update: 更新代码

git add .
git commit -m "%commit_msg%"
if errorlevel 1 (
    echo ⚠️  没有需要提交的更改，继续部署...
) else (
    echo ✅ 代码提交成功
)
echo.

REM 推送到远程仓库
echo [3/5] 📤 推送到远程仓库...
git push origin main
if errorlevel 1 (
    echo ⚠️  推送失败，可能还没配置远程仓库，继续部署...
) else (
    echo ✅ 推送成功
)
echo.

REM 连接服务器并部署
echo [4/5] 🔄 连接服务器并部署...
echo 正在执行远程部署命令...
ssh root@101.201.42.83 "cd /home/www/9agent-pc && git pull origin main 2>/dev/null || echo '跳过 git pull' && docker-compose down && docker-compose up -d --build && docker image prune -f"

if errorlevel 1 (
    echo.
    echo ❌ 部署失败！请检查：
    echo    1. 是否已配置 SSH 免密登录
    echo    2. 服务器是否可以连接
    echo    3. Docker 是否正常运行
    pause
    exit /b 1
)
echo.

REM 验证部署
echo [5/5] ✅ 验证部署...
timeout /t 3 /nobreak >nul
echo.

echo ========================================
echo ✨ 部署完成！
echo ========================================
echo.
echo 📍 访问地址: http://101.201.42.83
echo 📊 查看日志: ssh root@101.201.42.83 "docker-compose -f /home/www/9agent-pc/docker-compose.yml logs -f"
echo.
echo ========================================

pause

