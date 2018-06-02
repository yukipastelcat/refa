let chai = require('chai');
let fs = require('fs');
let bibtexService = require('../src/services/bibtexService');
let tagService = require('../src/services/tagService');

describe('tagService', function () {
    it('Gets an array of tags from parsed BibTeX file', function () {
        let refs = fs.readFileSync('tests/bibtex/refs.bib');
        bibtexService.bibtexToJson(refs).then(parsedContents => {
            let keys = tagService.processTags(parsedContents);
            chai.expect(keys).to.be.an('object');
            chai.expect(keys).to.not.be.empty;
        });
    })
})