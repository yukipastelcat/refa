let pug = require('pug');

function renderTemplate(templateUrl, viewModel) {
    console.log(viewModel);
    let html = pug.renderFile(templateUrl, {
        model: viewModel
    });
    return `data:text/html;charset=utf-8,${encodeURI(html)}`;
}

exports.renderTemplate = renderTemplate;