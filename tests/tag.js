let chai = require('chai');
let should = chai.should();
let fs = require('fs');
let bibtexService = require('../src/services/bibtexService');
let tagService = require('../src/services/tagService');

describe('tagService', function () {
    let refs = bibtexService.bibtexToJson(fs.readFileSync('tests/bibtex/references.bib'));
    let tags = tagService.processTags(refs);
    it(`Correctly parses list of tags and counts publications for each tag`, function () {
        let checkKeywords = {};
        for (publicationId in refs)
            refs[publicationId].fields.keywords.forEach(keyword => {
                if (checkKeywords[keyword])
                    checkKeywords[keyword] += 1;
                else
                    checkKeywords[keyword] = 1;
            });
        for (tag in tags)
            tags[tag].should.be.equal(checkKeywords[tag]);
    });
})