const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 1000,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
