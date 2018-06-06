let chai = require('chai');
let should = chai.should();
let fs = require('fs');
let bibtexService = require('../src/services/bibtexService');
let tagService = require('../src/services/tagService');

describe('tagService', function () {
    let refs = bibtexService.bibtexToJson(fs.readFileSync('tests/bibtex/references.bib'));
    let tags = tagService.processTags(refs);
    it('Returns an object', function () {
        chai.expect(tags).to.be.an('object');
    });
    it('Has a count property for each tag, showing how many publications on this tag', function () {
        for (tag in tags)
            tags[tag].should.be.a('number');
    });
})