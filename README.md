# MultiCord Web 🚀

Multi-account Discord desktop client with isolated sessions, split-view multitasking, and native OS aesthetics for **macOS**, **Windows**, and **Linux**.

---

## ⚡ Quick Start

Clone the repository and launch with the 1-click script for your operating system:

```bash
git clone https://github.com/Vuonggba1403/discord-multi-account.git
cd discord-multi-account
```

| Operating System | Terminal Command | Double-Click Alternative |
| :--- | :--- | :--- |
| **macOS / Linux** | `./start.sh` | Double-click `Run-MultiCord.command` in Finder |
| **Windows** | `start.bat` | Double-click `start.bat` in File Explorer |

> 💡 **Zero-Config Setup:** The launch scripts automatically check for Node.js (offering 1-click auto-install if missing), install required dependencies on first launch, and boot the application immediately.

---

## ✨ Key Features

- **Multi-Session Sandboxing**: Each account runs inside an isolated Electron partition (`persist:discord_acc_*`). Cookies, tokens, and storage never overlap or log you out.
- **Split-View Multitasking**: Work with two active Discord accounts side-by-side on a 50/50 split screen (`Cmd/Ctrl + D`).
- **100% ToS Compliant & Safe**: Powered by official Discord Web in sandboxed Chromium webviews. No client modification, no API tampering, zero ban risk.
- **Native OS Experience**:
  - **macOS**: Native traffic-light controls, blurred glassmorphic header pill, live status radar pulse, and Apple squircle dock icon.
  - **Windows & Linux**: Integrated titlebar overlay with native minimize, maximize, and close controls.
- **Unread Badges**: Real-time unread message counts on sidebar avatars and system Dock/Taskbar.
- **Smooth 60FPS Performance**: Lazy-loaded account slots and latency-free keyboard input optimizations.

---

## ⌨️ Shortcuts

| Action | macOS | Windows / Linux |
| :--- | :--- | :--- |
| **Switch Account** | `Cmd + 1` ... `Cmd + 9` | `Ctrl + 1` ... `Ctrl + 9` |
| **Add Account** | `Cmd + T` | `Ctrl + T` |
| **Toggle Split View** | `Cmd + D` | `Ctrl + D` |
| **Reload Account** | `Cmd + R` | `Ctrl + R` |

---

## 📦 Build Standalone Installers

Create standalone executables that require no Node.js or Terminal on user machines:

```bash
npm run dist:mac    # Generates .dmg & .zip for macOS
npm run dist:win    # Generates .exe installer & portable for Windows
npm run dist:linux  # Generates .AppImage & .deb for Linux
```
Compiled binaries are output to the `dist/` folder.

---

## 📝 Release Notes

### Features (`feat`)
- `feat(core)`: Multi-session isolation with persistent Electron partitions.
- `feat(ui)`: Discord-inspired dark sidebar with active indicator pills and smooth transitions.
- `feat(split-view)`: Dual-pane screen splitter with dynamic secondary account selector.
- `feat(badges)`: Live unread counters, notification dots, and system Dock/Taskbar synchronization.
- `feat(avatar)`: Dynamic Discord profile picture extraction independent of UI language.
- `feat(topbar)`: Glassmorphic account pill with animated radar status ring and quick-click customization.
- `feat(cross-platform)`: Native window styling for macOS, Windows 10/11, and Linux.
- `feat(launchers)`: 1-click auto-setup scripts (`start.sh`, `start.bat`, `Run-MultiCord.command`).

### Fixes & Optimizations (`fix`)
- `fix(perf)`: Disabled spellcheck background thread to eliminate typing latency in channels.
- `fix(gpu)`: Removed conflicting GPU rasterization flags to resolve macOS Skia buffer stutter.
- `fix(avatar)`: Resolved profile picture detection issues when running Discord in Vietnamese or other non-English locales.
- `fix(icon)`: Rebuilt macOS app icon to match Apple's squircle grid with 100% transparent corners.
- `fix(ui)`: Removed internal partition debug labels from the header for a clean native look.
- `fix(safety)`: Added confirmation modal before deleting an account session.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
