@echo off
chcp 65001 >nul
echo ========================================
echo   查看本地容器日志
echo ========================================
echo.
echo 💡 按 Ctrl+C 退出日志查看
echo.
timeout /t 2 >nul

docker-compose -f docker-compose.dev.yml logs -f

