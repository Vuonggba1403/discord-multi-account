# MultiCord Web 🚀

Multi-account Discord desktop client with isolated sessions, split-view multitasking, and native OS aesthetics for **macOS**, **Windows**, and **Linux**.

---

## ⚠️ Prerequisite: Install Node.js (Yêu cầu duy nhất: Cài đặt Node.js)

MultiCord Web is built on the Electron desktop framework, which **strictly requires Node.js** to run. If your machine does not have Node.js yet, install it once (takes ~1 minute):

👉 **Official Download: [https://nodejs.org/](https://nodejs.org/)**
- **Windows**: Click the green **LTS** button to download Windows Installer (`.msi`). Run the file and click **Next** -> **Next** -> **Install** -> **Finish**.
- **macOS**: Click the green **LTS** button to download macOS Installer (`.pkg`) and complete the wizard.

*(Bạn chỉ cần cài đặt Node.js một lần duy nhất trên máy. Sau đó, chọn 1 trong 3 cách bên dưới để khởi chạy ứng dụng).*

---

## 🚀 Quick Start / 3 Cách Khởi Chạy Ứng Dụng

Sau khi máy đã có Node.js, chọn cách thuận tiện nhất cho bạn:

### 1️⃣ Method 1: Git Clone (1-Liner for Terminal / Git users)
*Dành cho máy đã cài sẵn Git – Chạy đúng 1 dòng lệnh duy nhất:*

- **Windows (PowerShell)**:
  ```powershell
  git clone https://github.com/Vuonggba1403/discord-multi-account.git; cd discord-multi-account; .\start.bat
  ```

- **macOS / Linux (Terminal)**:
  ```bash
  git clone https://github.com/Vuonggba1403/discord-multi-account.git && cd discord-multi-account && ./start.sh
  ```

> 💡 *The script automatically installs required dependencies on first run and opens the app.*

---

### 2️⃣ Method 2: Download ZIP (Easiest for Fresh Machines without Git)
*Dành cho máy mới tinh chưa có Git / Không muốn gõ lệnh:*

1. **Download**: Click the green **`<> Code`** button -> select **[Download ZIP](https://github.com/Vuonggba1403/discord-multi-account/archive/refs/heads/main.zip)** *(Tải file ZIP về máy)*.
2. **Extract**: Unzip the folder on your computer *(Giải nén thư mục ra ổ đĩa)*.
3. **Launch**:
   - **Windows**: Double-click **`start.bat`** *(Nhấp đúp chuột vào file start.bat)*.
   - **macOS**: Double-click **`Run-MultiCord.command`** *(Nhấp đúp chuột vào file Run-MultiCord.command)*.

> ⚡ *First-time launch: The script will automatically install required libraries in 20-30 seconds and open the app! (Nếu chưa có Node.js, script sẽ tự động mở trang web nodejs.org để bạn tải).*

---

### 3️⃣ Method 3: Automated Setup via AI (Claude / ChatGPT / Codex / Cursor)
*Cài đặt tự động bằng cách dán câu lệnh vào các công cụ AI:*

If you are using an AI coding assistant (such as **Claude Code**, **Cursor**, **ChatGPT**, or **Codex**), simply paste this prompt:

```text
Please clone https://github.com/Vuonggba1403/discord-multi-account.git, ensure Node.js is installed on my system, install dependencies, and launch the MultiCord Web application.
```

The AI agent will clone the repository, check prerequisites, install packages, and launch MultiCord Web automatically.

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
