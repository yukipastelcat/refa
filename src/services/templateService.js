let pug = require('pug');

function renderTemplate(templateUrl, viewModel) {
    let html = pug.renderFile(templateUrl, {
        model: viewModel,
        jsonModel: JSON.stringify(viewModel)
    });
    return `data:text/html;charset=utf-8,${encodeURI(html)}`;
}

exports.renderTemplate = renderTemplate;