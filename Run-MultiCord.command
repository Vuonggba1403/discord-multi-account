#!/bin/bash
# MultiCord Web - macOS Double-Click Finder Launcher

DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
if [ -f "$HOME/.nvm/nvm.sh" ]; then
  source "$HOME/.nvm/nvm.sh"
fi

echo "=========================================="
echo "    🚀 Starting MultiCord Web...          "
echo "=========================================="

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "⚠️  Node.js is not installed on this system."
  if command -v brew >/dev/null 2>&1; then
    echo "💡 Homebrew detected. Installing Node.js..."
    brew install node
  else
    echo "❌ Please install Node.js from: https://nodejs.org/"
    read -p "Press Enter to exit..."
    exit 1
  fi
fi

if [ ! -d "node_modules/electron" ]; then
  echo "📦 First-time setup: Installing dependencies..."
  npm install --no-audit --no-fund
fi

echo "✨ Launching MultiCord Web..."
npm start
