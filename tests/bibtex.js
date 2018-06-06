let chai = require('chai');
let should = chai.should();
let fs = require('fs');
let bibtexService = require('../src/services/bibtexService');

describe('bibtexService', function () {
    let references = fs.readFileSync('tests/bibtex/references.bib');
    describe('Converts BibTeX entries to JavaScript object', function () {
        let object = bibtexService.bibtexToJson(references);
        it(`Returned object is not empty`, function () {
            chai.expect(object).not.to.be.empty;
        });
        it(`Each publication in object has 'bib_type' property`, function () {
            for (publication in object)
                object[publication].should.have.property('bib_type');
        });
        it(`Each publication in object has 'entry_key' property`, function () {
            for (publication in object)
                object[publication].should.have.property('entry_key');
        });
    });
});