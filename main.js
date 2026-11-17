const { app, BrowserWindow, session, ipcMain, Menu } = require('electron');
const path = require('path');

// Performance & Smoothness Optimizations for macOS Metal & Chromium
// Note: We avoid conflicting flags like --enable-gpu-rasterization which cause Skia mailbox errors on Apple Silicon
app.commandLine.appendSwitch('enable-smooth-scrolling');
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.commandLine.appendSwitch('enable-blink-features', 'EnumerateDevices,AudioOutputDevices');
app.commandLine.appendSwitch(
  'disable-features',
  'AllowAggressiveThrottlingWithWebSocket,DropInputEventsWhilePaintHolding,IntensiveWakeUpThrottling,UseEcoQoSForBackgroundProcess'
);

// Modern Chrome desktop User-Agent to ensure Discord Web works seamlessly
const DESKTOP_USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

let mainWindow = null;

function createWindow() {
  const iconPath = path.join(__dirname, 'icon.png');
  const isMac = process.platform === 'darwin';

  const windowOptions = {
    width: 1380,
    height: 860,
    minWidth: 960,
    minHeight: 600,
    title: 'MultiCord Web',
    icon: iconPath,
    backgroundColor: '#1e1f22',
    show: false, // Wait until ready to show to prevent white flash
    webPreferences: {
      webviewTag: true,
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
      spellcheck: false // Disabling spellcheck eliminates keyboard input latency and background thread lag
    }
  };

  if (isMac) {
    windowOptions.titleBarStyle = 'hiddenInset';
    windowOptions.trafficLightPosition = { x: 18, y: 16 };
  } else {
    // Windows & Linux: Smooth native title bar overlay with window controls on top-right
    windowOptions.titleBarStyle = 'hidden';
    windowOptions.titleBarOverlay = {
      color: '#1e1f22',
      symbolColor: '#dbdee1',
      height: 44
    };
  }

  mainWindow = new BrowserWindow(windowOptions);

  // Set macOS Dock Icon
  if (process.platform === 'darwin') {
    app.dock.setIcon(iconPath);
  }

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open external links in default browser instead of inside the webview
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://discord.com') || url.startsWith('https://canary.discord.com')) {
      return { action: 'allow' };
    }
    require('electron').shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Global permission handler to allow microphone, camera & desktop notifications
function setupPermissions(targetSession) {
  targetSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowed = ['media', 'notifications', 'fullscreen', 'pointerLock', 'clipboard-read'];
    if (allowed.includes(permission)) {
      return callback(true);
    }
    callback(false);
  });

  targetSession.setPermissionCheckHandler((webContents, permission) => {
    const allowed = ['media', 'notifications', 'fullscreen', 'pointerLock', 'clipboard-read'];
    return allowed.includes(permission);
  });

  // Apply Chrome User-Agent
  targetSession.setUserAgent(DESKTOP_USER_AGENT);
}

// macOS Dock Badge Handler (Show unread message count on Dock icon)
ipcMain.on('update-badge', (event, count) => {
  if (process.platform === 'darwin') {
    if (typeof count === 'number' && count > 0) {
      app.dock.setBadge(count > 99 ? '99+' : `${count}`);
    } else if (typeof count === 'string' && count.length > 0) {
      app.dock.setBadge(count);
    } else {
      app.dock.setBadge('');
    }
  }
});

app.whenReady().then(() => {
  setupPermissions(session.defaultSession);

  // Auto-grant permissions for dynamic session partitions (persist:discord_acc_*)
  app.on('session-created', (newSession) => {
    setupPermissions(newSession);
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
