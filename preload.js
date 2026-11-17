const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('multicordAPI', {
  platform: process.platform,
  version: '1.0.0',
  updateBadge: (count) => ipcRenderer.send('update-badge', count)
});
