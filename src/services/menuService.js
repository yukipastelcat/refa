const { configuration } = require('./startService');
const { dialog } = require('electron');
const eventsService = require('./eventsService');

let template = [
    {
        label: 'Файл',
        enabled: true,
        submenu: [{
            label: 'Открыть',
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
                    if (!filePaths) {
                        return;
                    }
                    eventsService.emitter.emit('file-open-fileselected', filePaths);
                });
            }
        }]
    }
];

if (configuration.isDebug) {
    template.push({
        label: 'Для разработчиков',
        submenu: [{
            label: 'Открыть инструменты разработчика',
            accelerator: 'CmdOrCtrl+Shift+I',
            role: 'toggleDevTools'
        }]
    })
}

exports.template = template;