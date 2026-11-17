# MultiCord Web 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey.svg)]()
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D%2018.0.0-green.svg)](https://nodejs.org/)
[![Electron](https://img.shields.io/badge/Electron-v34-47848F.svg)](https://www.electronjs.org/)
[![Discord](https://img.shields.io/badge/Discord-Official%20Web-5865F2.svg)](https://discord.com)

Multi-account Discord desktop client with isolated sessions, split-view multitasking, and native OS aesthetics for **macOS**, **Windows**, and **Linux**.

> 🌐 **Languages:** **English** | [🇻🇳 Tiếng Việt](#-hướng-dẫn-tiếng-việt)

---

## ⚠️ Prerequisite: Node.js Required

MultiCord Web is powered by the Electron desktop framework, which **strictly requires Node.js** to execute. If your computer does not have Node.js installed, download and install it once:

👉 **Official Download: [https://nodejs.org/](https://nodejs.org/)**
- **Windows**: Click the green **LTS** button to download Windows Installer (`.msi`). Run it and click **Next** -> **Next** -> **Install** -> **Finish**.
- **macOS**: Click the green **LTS** button to download macOS Installer (`.pkg`) and complete the setup wizard.

---

## 🚀 Quick Start (Choose 1 of 3 Methods)

Once Node.js is installed on your computer, choose the most convenient method:

### 1️⃣ Method 1: Git Clone (Fastest for Terminal / Git users)

Run the single 1-liner command in your terminal:

- **Windows (PowerShell)**:
  ```powershell
  git clone https://github.com/Vuonggba1403/discord-multi-account.git; cd discord-multi-account; .\start.bat
  ```

- **macOS / Linux (Terminal)**:
  ```bash
  git clone https://github.com/Vuonggba1403/discord-multi-account.git && cd discord-multi-account && ./start.sh
  ```

> 💡 *The script automatically verifies your environment, installs dependencies, and boots the client.*

---

### 2️⃣ Method 2: Download ZIP (Easiest for Fresh Machines without Git)

No terminal commands or Git required:

1. **Download**: Click the green **`<> Code`** button at the top of this repository -> select **[Download ZIP](https://github.com/Vuonggba1403/discord-multi-account/archive/refs/heads/main.zip)**.
2. **Extract**: Unzip the downloaded file to any folder on your computer.
3. **Launch**:
   - **On Windows**: Open the folder and double-click **`start.bat`**.
   - **On macOS**: Open the folder and double-click **`Run-MultiCord.command`** *(or run `./start.sh` in Terminal)*.

> ⚡ *First launch takes ~20-30 seconds to fetch Electron dependencies automatically, then MultiCord Web opens immediately.*

---

### 3️⃣ Method 3: Automated Setup via AI (Claude / ChatGPT / Codex / Cursor)

If you use an AI coding assistant (such as **Claude Code**, **Cursor**, **ChatGPT**, or **Codex**), simply paste this prompt:

```text
Please clone https://github.com/Vuonggba1403/discord-multi-account.git, ensure Node.js is installed on my system, install dependencies, and launch the MultiCord Web application.
```

The AI assistant will clone the repository, validate prerequisites, install required packages, and launch the application automatically.

---

## ✨ Key Features

- **Multi-Session Sandboxing**: Each account operates in an isolated Electron partition (`persist:discord_acc_*`). Cookies, tokens, and storage never overlap or disconnect.
- **Split-View Multitasking**: View and control two active Discord accounts side-by-side with a 50/50 dual screen (`Cmd/Ctrl + D`).
- **100% ToS Compliant & Safe**: Powered by official Discord Web inside sandboxed Chromium webviews. No client modification, no API tampering, zero risk of account suspension.
- **Native OS Aesthetics**:
  - **macOS**: Native traffic-light controls, blurred glassmorphic header pill, live status radar pulse, and Apple squircle dock icon.
  - **Windows & Linux**: Clean titlebar overlay with native minimize, maximize, and close controls.
- **Real-Time Unread Badges**: Unread message counts on sidebar avatars with macOS Dock and Windows Taskbar synchronization.
- **Smooth 60FPS Performance**: Optimized lazy loading and latency-free keyboard input handling.

---

## ⌨️ Shortcuts

| Action | macOS | Windows / Linux |
| :--- | :--- | :--- |
| **Switch Account** | `Cmd + 1` ... `Cmd + 9` | `Ctrl + 1` ... `Ctrl + 9` |
| **Add Account** | `Cmd + T` | `Ctrl + T` |
| **Toggle Split View** | `Cmd + D` | `Ctrl + D` |
| **Reload Active Tab** | `Cmd + R` | `Ctrl + R` |

---

## 📦 Building Standalone Binaries

Package MultiCord Web into standalone executables that require no Node.js or Terminal on target machines:

```bash
npm run dist:mac    # Generates .dmg & .zip for macOS
npm run dist:win    # Generates .exe installer & portable for Windows
npm run dist:linux  # Generates .AppImage & .deb for Linux
```

All compiled binaries are generated inside the `dist/` directory.

---

## 🔒 Security & Privacy

- **Direct Authentication**: Passwords, QR code logins, and 2FA authentication occur directly between the local Chromium sandbox and official Discord servers (`https://discord.com`).
- **No Third-Party Servers**: MultiCord Web contains no external analytics, tracking, or proxy services.
- **Local Storage Only**: Account credentials and persistent session partitions remain encrypted on your local machine.

---

## 🇻🇳 Hướng Dẫn Tiếng Việt

### ⚠️ Yêu cầu bắt buộc: Cài đặt Node.js
Ứng dụng chạy trên nền tảng Electron Desktop, nên máy tính **bắt buộc phải cài Node.js** (chỉ cài 1 lần duy nhất trong 1 phút):
* Truy cập trang chủ: **[https://nodejs.org/](https://nodejs.org/)**
* Bấm nút màu xanh **LTS** để tải bộ cài đặt:
  * **Windows**: Tải file `.msi`, mở lên bấm Next -> Install -> Finish.
  * **macOS**: Tải file `.pkg`, mở lên bấm Tiếp tục (Continue) -> Cài đặt (Install).

### 🚀 3 Cách chạy ứng dụng (Sau khi đã có Node.js):
1. **Cách 1 (Đã có Git - 1 dòng lệnh):**
   * *Windows (PowerShell):* `git clone https://github.com/Vuonggba1403/discord-multi-account.git; cd discord-multi-account; .\start.bat`
   * *macOS (Terminal):* `git clone https://github.com/Vuonggba1403/discord-multi-account.git && cd discord-multi-account && ./start.sh`
2. **Cách 2 (Tải file ZIP - Không cần gõ lệnh):**
   * Bấm nút **`<> Code`** -> Chọn **Download ZIP** -> Giải nén thư mục.
   * *Windows:* Nhấp đúp chuột vào file **`start.bat`**.
   * *macOS:* Nhấp đúp chuột vào file **`Run-MultiCord.command`**.
3. **Cách 3 (Dán prompt vào AI):**
   * Copy câu lệnh sau dán vào Claude Code / Cursor / ChatGPT:
     `Please clone https://github.com/Vuonggba1403/discord-multi-account.git, ensure Node.js is installed on my system, install dependencies, and launch the MultiCord Web application.`

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
