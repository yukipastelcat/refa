const electron = require('electron');
const template = require('./template');
const menu = require('./menu');

let mainWindow;

let createWindow = () => {
    mainWindow = new electron.BrowserWindow({
        width: 800,
        height: 600
    });
    mainWindow.loadURL(template.renderTemplate(`${__dirname}/views/main.pug`));
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

electron.Menu.setApplicationMenu(
    electron.Menu.buildFromTemplate(menu.template)
);

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