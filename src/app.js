const electron = require('electron');
const template = require('./template');

let mainWindow;

let createWindow = () => {
    mainWindow = new electron.BrowserWindow({
        width: 320,
        height: 480
    });
    mainWindow.loadURL(template.renderTemplate(`${__dirname}/views/main.pug`));
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

electron.app.on('ready', createWindow);

electron.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron.app.quit();
    }
});

electron.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});