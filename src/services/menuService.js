const { configuration } = require('./startService');
const { dialog } = require('electron');
const eventsService = require('./eventsService');

let template = [
    {
        label: 'File',
        enabled: true,
        submenu: [{
            label: 'Open',
            accelerator: 'CmdOrCtrl+O',
            click: function () {
                dialog.showOpenDialog({
                    title: 'Выберите файл',
                    filters: [{
                        name: 'Файлы bibtex',
                        extensions: ['bib'],
                        properties: ['openFile']
                    }]
                }, function (filePaths) {
                    eventsService.emitter.emit('file-open-fileselected', filePaths);
                });
            }
        }]
    }
];

if (configuration.isDebug) {
    template.push({
        label: 'Developer Tools',
        submenu: [{
            label: 'Toggle Developer Tools',
            accelerator: 'CmdOrCtrl+Shift+I',
            role: 'toggleDevTools'
        }]
    })
}

exports.template = template;