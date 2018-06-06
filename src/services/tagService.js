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
    return keywords;
}

exports.processTags = processTags;