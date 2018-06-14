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
    let queryWords = query.split(' ');
    let synonymsQuery = '';
    queryWords.forEach(word => {
        let wordRegexp = new RegExp(`${word}`, 'g');
        dictionary.some(synonym => {
            if (synonym.match(wordRegexp)) {
                synonymsQuery += synonym;
                synonymsQuery += '|';
            }
            return synonym.match(wordRegexp);
        });
    });
    let searchQuery = '';
    if (synonymsQuery) {
        searchQuery = `${synonymsQuery.substring(0, synonymsQuery.length - 1)}|${query.replace(/ /g, '|')}`;
    }
    else {
        searchQuery = `${query.replace(/ /g, '|')}`;
    }
    return new RegExp(searchQuery, 'ig');
}

exports.tagQuery = tagQuery;
exports.searchQuery = searchQuery;