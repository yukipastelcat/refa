const { synonyms } = require('./startService');

function getSynonyms () {
    return synonyms;
}

exports.getSynonyms = getSynonyms;