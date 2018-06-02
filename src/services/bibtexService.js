const Cite = require('citation-js');

async function bibtexToJson (blob) {
    let fileString = blob.toString();
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
    let bibtex;
    return bibtex;
}

exports.bibtexToJson = bibtexToJson;