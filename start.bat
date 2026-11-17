@echo off
chcp 65001 >nul
title MultiCord Web - Windows Launcher

echo ==========================================
echo     🚀 Starting MultiCord Web...          
echo ==========================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Node.js is not found on your system.
    echo.
    :: Check if winget is available (Windows 10/11 built-in)
    where winget >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo [INFO] Winget found! Installing Node.js LTS automatically...
        winget install -e --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
        echo.
        echo [INFO] Node.js has been installed! Please restart this script or Terminal.
        pause
        exit /b 0
    ) else (
        echo [ERROR] Please download and install Node.js from: https://nodejs.org/
        echo After installing Node.js, run this script again.
        pause
        exit /b 1
    )
)

:: Check if dependencies (node_modules) are installed
if not exist "node_modules\electron" (
    echo [INFO] First-time setup: Installing required dependencies...
    call npm install --no-audit --no-fund
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install dependencies. Please check your internet connection.
        pause
        exit /b 1
    )
)

echo [INFO] Launching MultiCord Web...
call npm start
