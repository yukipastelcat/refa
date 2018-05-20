const electron = require('electron');
const fs = require('fs');
const menu = require('./menu');
const appEvents = require('./appEvents');
const template = require('./template');
const bibtex = require('./bibtex');

const mainViewModel = require('./models/mainViewModel');

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

appEvents.emitter.on('file-open-fileselected', function (filePaths) {
    fs.readFile(filePaths[0], 'utf-8', function (err, blob) {
        bibtex.bibtexToJson(blob).then(parsedContents => {
            mainViewModel.model.publications = parsedContents;
        });
    });
});