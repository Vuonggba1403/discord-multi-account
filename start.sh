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
  echo "[INFO] Node.js is not installed on this system."
  if command -v brew >/dev/null 2>&1; then
    echo "[INFO] Homebrew found. Installing Node.js..."
    brew install node
  elif command -v apt >/dev/null 2>&1; then
    echo "[INFO] APT found. Installing Node.js & npm..."
    sudo apt update && sudo apt install -y nodejs npm
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "[INFO] Downloading official Node.js installer for macOS..."
    curl -fsSL "https://nodejs.org/dist/v20.18.0/node-v20.18.0.pkg" -o /tmp/node_setup.pkg
    echo "[INFO] Opening Node.js installer. Please complete the setup wizard..."
    open /tmp/node_setup.pkg
    echo "Once Node.js is installed, run ./start.sh again."
    exit 0
  else
    echo "[ERROR] Please install Node.js (v18+) from: https://nodejs.org/"
    exit 1
  fi
fi

# Automatically install dependencies if not found
if [ ! -d "node_modules/electron" ]; then
  echo "[INFO] First-time setup: Installing dependencies (Electron)..."
  npm install --no-audit --no-fund
fi

echo "[INFO] Launching MultiCord Web..."
npm start
