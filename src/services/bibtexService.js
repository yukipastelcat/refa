const converter = require('biblatex-csl-converter');
function bibtexToJson (blob) {
    let fileString = blob.toString();
    let json;
    let parser = new converter.BibLatexParser(fileString, { processUnexpected: true });
    json = parser.output;
    return json;
}

function jsonToBibtex (json) {
    let bibtex = new Cite(json).get({type: 'string', style: 'bibtex'});
    return bibtex;
}

exports.bibtexToJson = bibtexToJson;
exports.jsonToBibtex = jsonToBibtex;