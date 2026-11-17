# MultiCord Web 🚀

Multi-account Discord desktop client with isolated sessions, split-view multitasking, and native OS aesthetics for **macOS**, **Windows**, and **Linux**.

---

## ✨ Key Features

- **Multi-Session Sandboxing**: Each account operates in an isolated Electron partition (`persist:discord_acc_*`). Cookies, tokens, and storage never overlap or disconnect.
- **Split-View Multitasking**: View and control two active Discord accounts side-by-side with a 50/50 split screen (`Cmd/Ctrl + D`).
- **100% ToS Compliant**: Powered by official Discord Web inside sandboxed Chromium webviews. No client modification, no API tampering, zero risk of account suspension.
- **Native OS Aesthetics**:
  - **macOS**: Native traffic-light controls, blurred glassmorphic header pill, live status radar pulse, and Apple squircle dock icon.
  - **Windows & Linux**: Clean titlebar overlay with native minimize, maximize, and close controls.
- **Real-Time Unread Badges**: Unread message counts on sidebar avatars with macOS Dock and Windows Taskbar synchronization.
- **Smooth 60FPS Performance**: Optimized lazy loading and latency-free keyboard input handling.

---

## 🚀 Installation & Quick Start

Choose the easiest method for your machine:

### 1️⃣ Option 1: Git Clone (Fastest for Terminal / Git users)

Run the single 1-liner command for your operating system:

- **Windows (PowerShell)**:
  ```powershell
  git clone https://github.com/Vuonggba1403/discord-multi-account.git; cd discord-multi-account; .\start.bat
  ```

- **macOS / Linux (Terminal)**:
  ```bash
  git clone https://github.com/Vuonggba1403/discord-multi-account.git && cd discord-multi-account && ./start.sh
  ```

> 💡 *The script automatically verifies Node.js, installs required dependencies, and launches the application.*

---

### 2️⃣ Option 2: Download ZIP (Easiest for Fresh Machines without Git)

No terminal or Git required. Ideal for brand-new computers:

1. **Download**: Click the green **`<> Code`** button at the top of this repository -> select **[Download ZIP](https://github.com/Vuonggba1403/discord-multi-account/archive/refs/heads/main.zip)**.
2. **Extract**: Unzip the downloaded file to any folder on your computer.
3. **Launch**:
   - **On Windows**: Open the folder and double-click **`start.bat`**.
   - **On macOS**: Open the folder and double-click **`Run-MultiCord.command`** (or run `./start.sh` in Terminal).

> ⚡ *First-time setup: The launcher will automatically detect Node.js (auto-downloading if missing), install Electron libraries in 20-30 seconds, and open the app.*

---

### 3️⃣ Option 3: Automated Setup via AI (Claude / ChatGPT / Codex / Cursor)

If you are using an AI coding assistant (such as **Claude Code**, **Cursor**, **ChatGPT**, or **Codex**), simply paste this prompt:

```text
Please clone https://github.com/Vuonggba1403/discord-multi-account.git, ensure Node.js is installed on my system, install dependencies, and launch the MultiCord Web application.
```

The AI agent will clone the repository, check prerequisites, install packages, and launch MultiCord Web automatically.

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

Package MultiCord Web into standalone executables for distribution:

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

## 📄 License

This project is licensed under the [MIT License](LICENSE).
