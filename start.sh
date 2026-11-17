#!/bin/bash
# MultiCord Web - macOS / Linux 1-Click Launcher

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

# Check if Node.js and npm exist
if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "=========================================================="
  echo "[ERROR] Node.js is NOT installed on your computer!"
  echo "MultiCord Web requires Node.js to run."
  echo ""
  echo "Opening official download page: https://nodejs.org/ ..."
  echo "Please download the green 'LTS' installer, install it,"
  echo "and then run ./start.sh again!"
  echo "=========================================================="
  if [[ "$OSTYPE" == "darwin"* ]]; then
    open "https://nodejs.org/"
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "https://nodejs.org/"
  fi
  exit 1
fi

# Automatically install dependencies if not found
if [ ! -d "node_modules/electron" ]; then
  echo "[INFO] First-time setup: Installing dependencies (Electron)..."
  npm install --no-audit --no-fund
fi

echo "[INFO] Launching MultiCord Web..."
npm start
