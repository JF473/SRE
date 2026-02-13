const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    // icon: path.join(__dirname, '../public/favicon.ico') // Uncomment if you have an icon
  });

  const isDev = process.env.IS_DEV === 'true';

  if (isDev) {
    // In development, load the Vite dev server
    win.loadURL('http://localhost:5173');
    // win.webContents.openDevTools(); // Uncomment to open DevTools by default
  } else {
    // In production, load the built index.html
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});