let chai = require('chai');
let should = chai.should();
let fs = require('fs');
let bibtexService = require('../src/services/bibtexService');

describe('bibtexService', function () {
    let references = fs.readFileSync('tests/bibtex/references.bib');
    let incorrectReferences = fs.readFileSync('tests/bibtex/references_incorrect.bib');
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
    describe('Error handling', function () {
        let object = bibtexService.bibtexToJson(incorrectReferences);
        it('Should return parsed contents and incomplete flag, when BibTeX base is corrupted', function () {
            let incompleteFlag = false;
            for (publication in object)
                object[publication].should.have.property('bib_type');
                object[publication].should.have.property('entry_key');
                if (object[publication].incomplete)
                    incompleteFlag = true;
            incompleteFlag.should.be.true;
        });
    });
});