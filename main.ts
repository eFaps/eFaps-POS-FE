import * as path from 'path';
import * as url from 'url';

import { BrowserWindow, app } from 'electron';
import { localStorage } from 'electron-browser-storage';

let win, baseUrl;
let devMode = false;
let lifeMode = false;
console.log(process.argv);

process.argv.forEach(val => {
  if (val === '--dev') {
    devMode = true;
  }
  if (val === '--life') {
    lifeMode = true;
  }
  if (val.startsWith('--baseUrl=')) {
    baseUrl = val.replace('--baseUrl=', '');
  }
});

function createWindow() {
  win = new BrowserWindow({
    kiosk: !devMode,
    webPreferences: {
      webSecurity: false
    }
  });
  if (devMode) {
    win.webContents.openDevTools();
  }
  if (lifeMode) {
    console.log('*** LIFE Mode ***');
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
  win.on('closed', function() {
    win = null;
  });
}
app.on('ready', async () => {
  if (baseUrl) {
    await localStorage.setItem('synerPOS_baseUrl', baseUrl);
  }
  createWindow();
});

app.on('window-all-closed', function() {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // macOS specific close process
  if (win === null) {
    createWindow();
  }
});

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  event.preventDefault()
  callback(true)
})
