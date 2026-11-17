#!/bin/bash
# MultiCord Web - macOS / Linux 1-Click Terminal Launcher

DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
if [ -f "$HOME/.nvm/nvm.sh" ]; then
  source "$HOME/.nvm/nvm.sh"
fi

echo "=========================================="
echo "    🚀 Starting MultiCord Web...          "
echo "=========================================="

# Check if Node.js and npm exist
if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "⚠️  Node.js is not installed on this system."
  if command -v brew >/dev/null 2>&1; then
    echo "💡 Homebrew detected. Installing Node.js..."
    brew install node
  elif command -v apt >/dev/null 2>&1; then
    echo "💡 APT package manager detected. Installing Node.js & npm..."
    sudo apt update && sudo apt install -y nodejs npm
  else
    echo "❌ Please install Node.js (v18+) from: https://nodejs.org/"
    exit 1
  fi
fi

# Automatically install dependencies if not found
if [ ! -d "node_modules/electron" ]; then
  echo "📦 First-time setup: Installing dependencies (Electron)..."
  npm install --no-audit --no-fund
fi

echo "✨ Launching MultiCord Web..."
npm start
