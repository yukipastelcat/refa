let findSynonym = function (regex, synonyms) {
    let BreakException = {};
    let synonymRegex;
    synonyms.some(synonym => {
        if (regex.test(synonym)) {
            synonymRegex = new RegExp(synonym, 'i');
        }
        return regex.test(synonym);
    });
    return synonymRegex || '';
}

exports.findSynonym = findSynonym;