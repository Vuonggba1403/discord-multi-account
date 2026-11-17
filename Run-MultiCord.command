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
  echo "=========================================================="
  echo "[ERROR] Node.js is NOT installed on your computer!"
  echo "MultiCord Web requires Node.js to run."
  echo ""
  echo "Opening official download page: https://nodejs.org/ ..."
  echo "Please download the green 'LTS' installer, install it,"
  echo "and then double-click this file again!"
  echo "=========================================================="
  open "https://nodejs.org/"
  read -p "Press Enter to exit..."
  exit 1
fi

if [ ! -d "node_modules/electron" ]; then
  echo "[INFO] First-time setup: Installing dependencies..."
  npm install --no-audit --no-fund
fi

echo "[INFO] Launching MultiCord Web..."
npm start
