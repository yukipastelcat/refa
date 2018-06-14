let synonymService = require('./synonymService');
let tagQuery = (include, exclude) => {
    let excludeString = '';
    let includeString = '';
    exclude.forEach(word => {
        excludeString += `\\b${word}\\b|`;
    });
    excludeString = excludeString.substring(0, excludeString.length - 1);
    include.forEach(word => {
        includeString += `\\b${word}\\b|`;
    });
    includeString = includeString.substring(0, includeString.length - 1);
    if (excludeString) {
        return new RegExp(`(?!${excludeString})(${includeString})`, 'igm');
    }
    else {
        return new RegExp(`(${includeString})`, 'igm');
    }
}

let searchQuery = (query, dictionary) => {
    query = query.split(' ');
    let synonymsQuery = '';
    query.forEach(word => {
        let wordRegexp = new RegExp(`\\b${word}\\b`, 'g');
        dictionary.some(synonym => {
            if (synonym.match(wordRegexp)) {
                synonymsQuery += synonym;
                synonymsQuery += '|';
            }
            return synonym.match(wordRegexp);
        });
    });
    synonymsQuery = synonymsQuery.substring(0, synonymsQuery.length - 1);
    return new RegExp(synonymsQuery.replace(/ /g, '|'), 'i');
}

exports.tagQuery = tagQuery;
exports.searchQuery = searchQuery;