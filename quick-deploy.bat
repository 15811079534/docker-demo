@echo off
chcp 65001 >nul
REM 快速部署脚本 - 无需输入提交信息

echo 🚀 快速部署中...

REM 提交所有更改
git add . 2>nul
git commit -m "update: 快速更新 %date% %time%" 2>nul

REM 推送
git push origin main 2>nul

REM 部署
echo 正在部署到服务器...
ssh root@101.201.42.83 "cd /home/www/9agent-pc && git pull origin main 2>/dev/null && docker-compose up -d --build && docker image prune -f"

if errorlevel 1 (
    echo ❌ 部署失败
    pause
    exit /b 1
)

echo.
echo ✅ 部署完成！访问: http://101.201.42.83
timeout /t 3

