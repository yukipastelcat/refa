let electron = require('electron'),
    fs = require('fs'),
    menuService = require('./services/menuService'),
    eventsService = require('./services/eventsService'),
    template = require('./template'),
    bibtexService = require('./services/bibtexService'),
    tagService = require('./services/tagService');
let mainViewModel = require('./models/mainViewModel');

let mainWindow;

let createWindow = () => {
    mainWindow = new electron.BrowserWindow({
        width: 800,
        height: 600
    });
    mainWindow.loadURL(template.renderTemplate(`${__dirname}/views/main.pug`, mainViewModel));
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
    fs.readFile(filePaths[0], 'utf-8', function (err, blob) {
        bibtexService.bibtexToJson(blob).then(parsedContents => {
            mainViewModel.publications = parsedContents;
            mainViewModel.tags = tagService.processTags(mainViewModel.publications);
            console.log(mainViewModel.publications);
            mainWindow.loadURL(template.renderTemplate(`${__dirname}/views/main.pug`, mainViewModel));
        });
    });
});