let electron = require('electron'),
    fs = require('fs'),
    menuService = require('./services/menuService'),
    eventsService = require('./services/eventsService'),
    templateService = require('./services/templateService'),
    bibtexService = require('./services/bibtexService'),
    tagService = require('./services/tagService'),
    startService = require('./services/startService');
let mainViewModel = require('./models/mainViewModel');

let mainWindow;

let createWindow = () => {
    mainWindow = new electron.BrowserWindow({
        width: 800,
        height: 600
    });
    mainWindow.loadURL(templateService.renderTemplate(`${__dirname}/views/main.pug`, mainViewModel));
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

electron.Menu.setApplicationMenu(
    electron.Menu.buildFromTemplate(menuService.template)
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

eventsService.emitter.on('file-open-fileselected', function (filePaths) {
    let blob = fs.readFileSync(filePaths[0]);
    mainViewModel.publications = bibtexService.bibtexToJson(blob);
    mainViewModel.tags = tagService.processTags(mainViewModel.publications);
    mainViewModel.synonyms = startService.synonyms;
    mainWindow.loadURL(templateService.renderTemplate(`${__dirname}/views/main.pug`, mainViewModel));
    electron.ipcMain.once('request-view-model', function () {
        mainWindow.webContents.send('view-model-response', mainViewModel);
    });
    /*bibtexService.bibtexToJson(blob).then(parsedContents => {
        mainViewModel.publications = parsedContents;
        mainViewModel.tags = tagService.processTags(mainViewModel.publications);
        mainViewModel.synonyms = startService.synonyms;
        mainWindow.loadURL(templateService.renderTemplate(`${__dirname}/views/main.pug`, mainViewModel));
        electron.ipcMain.once('request-view-model', function () {
            mainWindow.webContents.send('view-model-response', mainViewModel);
        });
    });*/
});