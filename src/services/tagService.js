let processTags = function (publications) {
    let keywords = {};
    for (number in publications) {
        if (publications[number].fields.keywords) {
            publications[number].fields.keywords.forEach(keyword => {
                if (!keywords[keyword])
                    keywords[keyword] = 1;
                else
                    keywords[keyword] += 1;
            });
        }
    }
    let sortedKeywords = {};
    Object.keys(keywords).sort().forEach(key => {
        sortedKeywords[key] = keywords[key];
    });
    return sortedKeywords;
}

exports.processTags = processTags;