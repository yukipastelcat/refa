let chai = require('chai');
let should = chai.should();
let fs = require('fs');
let bibtexService = require('../src/services/bibtexService');

describe('bibtexService performance', function () {
    let references = fs.readFileSync('tests/bibtex/references_formatinsensitive.bib').toString();
    it('1 entry', function () {
        bibtexService.bibtexToJson(references);
    });
    it('2 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
    it('4 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
    it('8 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
    it('16 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
    it('32 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
    it('64 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
    it('128 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
    it('256 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
    it('512 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
    it('1024 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
    it('2048 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
    it('4096 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
    it('8192 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
    it('16384 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
    it('32768 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
    it('65536 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
    it('131072 entries', function () {
        this.timeout(60000);
        references = incrementAndParse(references);
    });
});


function incrementAndParse(refs) {
    refs = refs.repeat(2);
    let object = bibtexService.bibtexToJson(refs);
    object.should.be.an('object');
    return refs;
}