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

:: 3. Node.js is missing. Auto-installing official Node.js LTS via PowerShell...
echo [INFO] Node.js is not installed on this system.
echo [INFO] Automatically downloading official Node.js LTS from nodejs.org...
echo [INFO] Please click 'Yes' if Windows asks for administrator permission.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "Write-Host '[1/2] Downloading official Node.js installer...' -ForegroundColor Cyan; " ^
  "$msi = [System.IO.Path]::Combine($env:TEMP, 'node_setup.msi'); " ^
  "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; " ^
  "(New-Object System.Net.WebClient).DownloadFile('https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi', $msi); " ^
  "Write-Host '[2/2] Installing Node.js silently...' -ForegroundColor Cyan; " ^
  "Start-Process msiexec.exe -ArgumentList '/i', $msi, '/qn', '/norestart' -Wait; " ^
  "Remove-Item -Force $msi -ErrorAction SilentlyContinue"

:: Update PATH in current session
if exist "%ProgramFiles%\nodejs\node.exe" (
    set "PATH=%ProgramFiles%\nodejs;%APPDATA%\npm;!PATH!"
    echo [INFO] Node.js has been successfully installed!
    echo.
) else (
    echo [WARNING] Automatic installation could not finish.
    echo Please download and install Node.js manually from: https://nodejs.org/
    echo (Choose 'LTS' Windows Installer .msi, then run start.bat again).
    pause
    exit /b 1
)

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
