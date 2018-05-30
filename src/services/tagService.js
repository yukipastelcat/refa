function processTags(publications) {
    let keywords = {};
    publications.forEach(function (publication) {
        if (!publication.properties.keywords) {
            return;
        }
        let publicationKeywords = publication.properties.keywords.split(/,|;/);
        publicationKeywords.forEach(function (keyword) {
            keyword = keyword.trim();
            if (!keywords[keyword]) {
                keywords[keyword] = 1;
            }
            else {
                keywords[keyword] += 1;
            }
        });
    });
    return keywords;
}

exports.processTags = processTags;