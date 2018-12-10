import * as path from 'path';
import * as url from 'url';

import { BrowserWindow, app } from 'electron';

let win;
let devMode = process.argv.includes('--dev');
console.log(process.argv);
function createWindow() {
  win = new BrowserWindow({
    kiosk: !devMode,
    webPreferences: {
      webSecurity: false
    }
  });
  if (devMode) {
    console.log('*** DEV Mode ***');
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
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
app.on('ready', createWindow);

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
