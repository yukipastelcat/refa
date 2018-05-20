const Cite = require('citation-js');


async function bibtexToJson (blob) {
    let json;
    try {
        json = await Cite.parse.bibtex.text(blob);
    }
    catch (err) {

    }
    return json;
}

function jsonToBibtex (json) {
    let bibtex;
    return bibtex;
}

exports.bibtexToJson = bibtexToJson;