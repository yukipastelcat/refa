let pug = require('pug');
let startService = require('./startService');
let fs = require('fs');

function renderTemplate(templateUrl, viewModel, templateName) {
    let html = pug.renderFile(templateUrl, {
        model: viewModel
    });

    let template = '';
    console.log(html.length);
    if (html.length > 100000) {
        fs.writeFile(`${startService.configuration.folder}/tmp/${templateName}`, html);
        template = `${startService.configuration.folder}/tmp/${templateName}`;
    }
    else {
        template = `data:text/html;charset=utf-8,${encodeURI(html)}`;
    }
    return template;
}

exports.renderTemplate = renderTemplate;