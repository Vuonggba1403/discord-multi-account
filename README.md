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

## 🚀 Installation & Getting Started

### Method 1: Pre-built Release (Recommended for End Users)

Download the ready-to-use package directly from [Releases](https://github.com/Vuonggba1403/discord-multi-account/releases):

- **macOS**: Download `.dmg`, open it, and drag `MultiCord Web.app` into your `Applications` folder.
- **Windows**: Download `.exe` installer or standalone portable executable and run directly.
- **Linux**: Download `.AppImage` or `.deb` package and execute.

> *Zero setup required: No Node.js, npm, or terminal commands needed.*

---

### Method 2: 1-Click Launch Scripts (From Source)

Clone the repository and run the automated script for your operating system:

```bash
git clone https://github.com/Vuonggba1403/discord-multi-account.git
cd discord-multi-account
```

| Operating System | Terminal Command | Double-Click Alternative |
| :--- | :--- | :--- |
| **macOS / Linux** | `./start.sh` | Double-click `Run-MultiCord.command` in Finder |
| **Windows** | `start.bat` | Double-click `start.bat` in File Explorer |

> 💡 **Auto-Setup:** The launch scripts automatically detect Node.js (offering 1-click installation if missing), install required dependencies on first launch, and boot the application immediately.

---

### Method 3: Complete A-to-Z Guide for Fresh Machines

#### 🪟 Windows Setup (Step-by-Step)
1. **Install Node.js (One-time prerequisite)**:
   - Go to [nodejs.org](https://nodejs.org/) and download the **LTS** Windows Installer (`.msi`).
   - Run the downloaded installer and click `Next` through the wizard (keep default settings) until finished.
2. **Download MultiCord Web**:
   - On this repository, click the green `<> Code` button and select **Download ZIP**.
   - Right-click the downloaded `.zip` file and select **Extract All...**.
3. **Launch**:
   - Open the extracted folder and **double-click `start.bat`**.
   - The launcher will install required packages automatically and open the client.

#### 🍏 macOS Setup (Step-by-Step)
1. **Install Node.js (One-time prerequisite)**:
   - Go to [nodejs.org](https://nodejs.org/) and download the **LTS** macOS Installer (`.pkg`).
   - Open the `.pkg` file and complete the standard installation wizard.
2. **Download MultiCord Web**:
   - Click the green `<> Code` button and select **Download ZIP**.
   - Double-click the `.zip` file to extract the folder.
3. **Launch**:
   - Open the extracted folder and **double-click `Run-MultiCord.command`** (or run `./start.sh` in Terminal).
   - The client will set up dependencies and launch immediately.

---

### Method 4: AI Agent Prompt (Claude Code / Codex / ChatGPT / Cursor)

If you use an AI assistant or coding terminal, copy and paste this prompt:

```text
Please clone https://github.com/Vuonggba1403/discord-multi-account.git, ensure Node.js is installed on my system, install dependencies, and launch the MultiCord Web application.
```

Or execute this direct 1-liner command in your terminal:

- **Windows (PowerShell)**:
  ```powershell
  git clone https://github.com/Vuonggba1403/discord-multi-account.git; cd discord-multi-account; .\start.bat
  ```
- **macOS / Linux (Terminal)**:
  ```bash
  git clone https://github.com/Vuonggba1403/discord-multi-account.git && cd discord-multi-account && ./start.sh
  ```

---

### Method 5: Manual Developer CLI

Prerequisites: [Node.js](https://nodejs.org/) (v18 or higher recommended).

```bash
# 1. Install dependencies
npm install

# 2. Launch the desktop client
npm start
```

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
