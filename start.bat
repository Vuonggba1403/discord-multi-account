@echo off
setlocal EnableDelayedExpansion
title MultiCord Web Launcher

echo ==========================================
echo       Starting MultiCord Web...
echo ==========================================
echo.

:: 1. Check if Node.js is in PATH
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 goto :CHECK_DEPS

:: 2. Check if Node.js exists in standard Program Files
if exist "%ProgramFiles%\nodejs\node.exe" (
    set "PATH=%ProgramFiles%\nodejs;%APPDATA%\npm;!PATH!"
    goto :CHECK_DEPS
)
if exist "%ProgramFiles(x86)%\nodejs\node.exe" (
    set "PATH=%ProgramFiles(x86)%\nodejs;%APPDATA%\npm;!PATH!"
    goto :CHECK_DEPS
)

:: 3. Node.js is missing! Notify user and open download page
echo ==========================================================
echo [ERROR] Node.js is NOT installed on your computer!
echo MultiCord Web requires Node.js to run.
echo.
echo 1. Opening official download website: https://nodejs.org/
echo 2. Click the green 'LTS' button to download Windows Installer (.msi).
echo 3. Run the installer and click Next -> Next -> Install.
echo 4. Once finished, double-click 'start.bat' again!
echo ==========================================================
echo.
start https://nodejs.org/
pause
exit /b 1

:CHECK_DEPS
:: Check if node_modules exists
if not exist "node_modules\electron" (
    echo [INFO] First-time setup: Installing dependencies...
    echo [INFO] This takes about 20-30 seconds, please wait...
    call npm install --no-audit --no-fund
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install dependencies. Please check your internet connection.
        pause
        exit /b 1
    )
)

echo [INFO] Launching MultiCord Web...
call npm start
