#!/bin/bash
# MultiCord Web - macOS Double-Click Finder Launcher

DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
if [ -f "$HOME/.nvm/nvm.sh" ]; then
  source "$HOME/.nvm/nvm.sh"
fi

echo "=========================================="
echo "      Starting MultiCord Web...           "
echo "=========================================="
echo ""

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "[INFO] Node.js is not installed on this system."
  if command -v brew >/dev/null 2>&1; then
    echo "[INFO] Homebrew found. Installing Node.js..."
    brew install node
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "[INFO] Downloading official Node.js installer for macOS..."
    curl -fsSL "https://nodejs.org/dist/v20.18.0/node-v20.18.0.pkg" -o /tmp/node_setup.pkg
    echo "[INFO] Opening Node.js installer. Please complete the setup wizard..."
    open /tmp/node_setup.pkg
    read -p "Once Node.js is installed, double-click this file again. Press Enter to exit..."
    exit 0
  else
    echo "[ERROR] Please install Node.js from: https://nodejs.org/"
    read -p "Press Enter to exit..."
    exit 1
  fi
fi

if [ ! -d "node_modules/electron" ]; then
  echo "[INFO] First-time setup: Installing dependencies..."
  npm install --no-audit --no-fund
fi

echo "[INFO] Launching MultiCord Web..."
npm start
