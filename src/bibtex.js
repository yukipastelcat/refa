let Cite = require('citation-js');

async function bibtexToJson (contents) {
    let bibtex;
    try {
        bibtex = await Cite.parse.bibtex.text(contents);
    }
    catch (err) {

    }
    return bibtex;
}

exports.bibtexToJson = bibtexToJson;