const Cite = require('citation-js');
async function bibtexToJson (blob) {
    let fileString = blob.toString().replace(/^%.*/gm, '');
    let json;
    try {
        json = await Cite.parse.bibtex.text(fileString);
    }
    catch (err) {
        throw err;
    }
    return json;
}

function jsonToBibtex (json) {
    let bibtex = new Cite(json).get({type: 'string', style: 'bibtex'});
    return bibtex;
}

exports.bibtexToJson = bibtexToJson;
exports.jsonToBibtex = jsonToBibtex;