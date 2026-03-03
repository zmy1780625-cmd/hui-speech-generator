@echo off
echo ========================================
echo 晖总演讲稿生成器 - Vercel部署脚本
echo ========================================
echo.

:: 检查是否安装了Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 未检测到Node.js
    echo 请先安装Node.js: https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js已安装
node --version

:: 检查是否安装了Vercel CLI
vercel --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo 📦 正在安装Vercel CLI...
    npm install -g vercel
    if errorlevel 1 (
        echo ❌ Vercel CLI安装失败
        pause
        exit /b 1
    )
)

echo ✅ Vercel CLI已安装
vercel --version

echo.
echo 🚀 开始部署到Vercel...
echo.

:: 部署到Vercel
vercel --prod

if errorlevel 1 (
    echo.
    echo ❌ 部署失败，请检查错误信息
    pause
    exit /b 1
)

echo.
echo ✅ 部署成功！
echo.
echo 📋 接下来的步骤：
echo 1. 访问Vercel Dashboard设置环境变量
echo 2. 添加以下环境变量：
echo    - GLM_API_KEY: 764bcbe559d144999f80f23878a45f2f.mmxXqw2xqA19J8pN
echo    - QWEN_API_KEY: sk-6fa39fc29fd141f694c60ff718ab3b58
echo 3. 重新部署项目使环境变量生效
echo.
echo 🌐 访问你的应用开始使用！
echo.
pause