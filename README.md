# MultiCord Web 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey.svg)]()
[![Electron](https://img.shields.io/badge/Electron-v34-47848F.svg)](https://www.electronjs.org/)
[![Discord](https://img.shields.io/badge/Discord-Official%20Web-5865F2.svg)](https://discord.com)

**MultiCord Web** is an open-source, ultra-lightweight desktop client that enables you to run, switch, and split-screen **multiple independent Discord accounts simultaneously** in a single unified window.

Built with performance, privacy, and native desktop aesthetics in mind for **macOS**, **Windows**, and **Linux**.

---

## ✨ Features

- 🔒 **Isolated Session Sandboxing**: Each Discord account runs in its own permanent session partition (`persist:discord_acc_*`). Cookies, tokens, and local storage remain 100% isolated. Logging into multiple accounts never causes conflicts or session drops.
- ⚡ **100% Safe & ToS Compliant**: MultiCord Web renders official Discord Web (`https://discord.com/app`) inside isolated Chromium webviews. Unlike modified clients (e.g., BetterDiscord, Vencord) that inject code into Discord's internal bundle, MultiCord operates identically to opening independent browser profiles. **Zero risk of account suspensions or bans.**
- 🪟 **Side-by-Side Split View**: Monitor two Discord accounts simultaneously with a 50/50 dual-pane mode (`Cmd/Ctrl + D`). Chat on your main account while monitoring servers or work chats on your secondary account.
- 🎨 **Native OS Design & Polish**:
  - **macOS**: Native traffic-light controls integration, blurred glassmorphic header pill, live status radar pulse, and Apple squircle icon.
  - **Windows & Linux**: Clean titlebar overlay with native minimize, maximize, and close controls.
- 🔔 **Real-Time Notification Badges**: Unread message badges automatically appear on each account icon in the sidebar and sync to the system Dock/Taskbar.
- 🖼️ **Automatic Avatar Synchronization**: Extracts your actual Discord profile picture directly into the switcher bar.
- 🚀 **Lag-Free 60FPS Performance**:
  - **Lazy Loading**: Inactive accounts are kept suspended until opened to drastically reduce CPU and RAM footprint.
  - **Spellcheck Latency Eliminator**: Spellchecking is streamlined to remove typing latency in crowded Discord channels.
  - Tuned GPU flags prevent Skia buffer stutter on Apple Silicon (M-series) and modern GPUs.
- ⌨️ **Productivity Keyboard Shortcuts**: Navigate seamlessly between accounts without lifting your hands from the keyboard.

---

## 🚀 Quick Start (1-Click Launchers)

No manual setup or complex configurations required. Choose your platform:

### 🍏 macOS & 🐧 Linux

#### Option 1: One-Click Terminal Command
Open your terminal inside the project directory and run:
```bash
./start.sh
```
> **What `start.sh` does automatically:**
> 1. Verifies if **Node.js** is installed. If missing, it offers automatic installation via Homebrew (macOS) or APT (Ubuntu/Debian).
> 2. Automatically installs project dependencies (`npm install`) on first launch.
> 3. Launches the application immediately.

#### Option 2: Double-Click in Finder (macOS)
Simply **double-click** the [`Run-MultiCord.command`](./Run-MultiCord.command) file directly inside Finder. macOS will launch the application automatically.

---

### 🪟 Windows

#### Option 1: Double-Click in File Explorer
Simply **double-click** [`start.bat`](./start.bat) in the project folder.

#### Option 2: Command Prompt or PowerShell
```cmd
start.bat
```
> **What `start.bat` does automatically:**
> 1. Detects if Node.js is installed. If missing, it leverages Windows Package Manager (`winget`) to install Node.js LTS automatically.
> 2. Installs required packages on first launch.
> 3. Boots MultiCord Web seamlessly.

---

### 💻 Manual CLI (For Developers)

If you already have [Node.js](https://nodejs.org/) installed:

```bash
# 1. Clone repository
git clone https://github.com/<your-username>/discord-multi-web.git
cd discord-multi-web

# 2. Install dependencies
npm install

# 3. Start development app
npm start
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut (macOS) | Shortcut (Windows/Linux) | Action |
| :--- | :--- | :--- |
| `Cmd + 1` ... `Cmd + 9` | `Ctrl + 1` ... `Ctrl + 9` | Switch instantly to account #1 – #9 |
| `Cmd + T` | `Ctrl + T` | Add a new Discord account slot |
| `Cmd + D` | `Ctrl + D` | Toggle Dual-Screen (Split View) |
| `Cmd + R` | `Ctrl + R` | Reload the active Discord account |

---

## 📦 Building Standalone Installers (.dmg, .exe, .deb)

You can package MultiCord Web into standalone executables that require **no Node.js or Terminal on the target machine**:

```bash
# Package for macOS (.dmg and .zip)
npm run dist:mac

# Package for Windows (.exe installer and portable)
npm run dist:win

# Package for Linux (.AppImage and .deb)
npm run dist:linux

# Package for current host OS
npm run dist
```

All compiled binaries will be generated inside the `dist/` directory.

---

## 🔒 Security & Privacy FAQ

#### Does this app store my password or Discord token?
**No.** All credentials, 2-Factor Authentication (2FA), and QR code logins occur directly between your local Chromium sandbox and Discord's encrypted endpoints (`https://discord.com`). The application contains no tracking, telemetry, or external backend servers.

#### Can using this get my Discord accounts banned?
**No.** MultiCord Web is simply an isolated multi-instance web browser. It does not inject code into Discord's client bundle, modify APIs, unlock Nitro perks, or run user bots. To Discord servers, each session looks like a standard Google Chrome browser tab.

#### Does logging in here log me out of my phone or official Discord app?
**No.** Discord natively supports simultaneous sessions across multiple devices. Logging in on MultiCord Web will not interrupt your active sessions on mobile or desktop apps.

---

## 📂 Project Structure

```text
├── main.js                 # Electron main process (lifecycle, multi-window config, security)
├── preload.js              # Secure context-bridge between Electron and webview
├── index.html              # Core application layout (sidebar, topbar, webview slots, modals)
├── styles.css              # Discord Dark theme styling, glassmorphism, animations & layout
├── renderer.js             # Account management, session storage, unread badges, split view
├── start.sh                # 1-Click launcher script for macOS / Linux
├── start.bat               # 1-Click launcher script for Windows
├── Run-MultiCord.command   # Double-click launcher for macOS Finder
├── icon.png / icon.icns    # Official Apple squircle & desktop icons
└── package.json            # Build scripts, metadata, and electron-builder configurations
```

---

## 📝 Changelog & Release Notes

### Features (`feat`)
- `feat(core)`: Multi-session isolation engine leveraging Electron `persist:discord_acc_*` partition sandboxes.
- `feat(ui)`: Discord-inspired dark sidebar with active white pill indicators and smooth selection animations.
- `feat(split-view)`: Dual-pane screen splitter allowing two concurrent active accounts side-by-side with dynamic account selector dropdown.
- `feat(badges)`: Real-time unread message counters on account avatars, dot indicators for silent notifications, and native OS Dock badge synchronization.
- `feat(avatar)`: Dynamic profile picture auto-sync from Discord CDN independent of language settings.
- `feat(topbar)`: Glassmorphic account pill badge with animated radar status ring, smooth entrance bounce, and quick-click customization.
- `feat(cross-platform)`: Out-of-the-box support for macOS (`hiddenInset` with native traffic lights), Windows (`titleBarOverlay` controls), and Linux.
- `feat(launchers)`: 1-Click zero-config scripts:
  - `start.sh` for macOS / Linux (auto-detects and installs Node.js via Homebrew/APT if absent).
  - `start.bat` for Windows (auto-detects and installs Node.js via Winget if absent).
  - `Run-MultiCord.command` for macOS Finder double-click launch.

### Fixes & Optimizations (`fix`)
- `fix(perf)`: Eliminated typing latency by disabling Chromium spellcheck thread overhead.
- `fix(gpu)`: Resolved Skia mailbox overlay buffer errors on macOS Apple Silicon (M-series) by removing conflicting GPU rasterization flags.
- `fix(avatar)`: Fixed profile avatar extraction in non-English locales (e.g., Vietnamese) by targeting user panel avatars directly.
- `fix(icon)`: Rebuilt macOS app icon to match Apple's official squircle standard with 100% transparent corners (no white border artifacts).
- `fix(ui)`: Removed internal debug partition identifiers from the topbar header for a clean native aesthetic.
- `fix(safety)`: Added confirmation modal before deleting an account session to prevent accidental closure.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute it.
