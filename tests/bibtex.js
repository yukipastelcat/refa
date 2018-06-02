let chai = require('chai');
let fs = require('fs');
let bibtexService = require('../src/services/bibtexService');

describe('bibtexService', function () {
    describe('Convert BibTeX file to JS object', function () {
        let refs = fs.readFileSync('tests/bibtex/refs.bib');
        it('Returns an object', function () {
            bibtexService.bibtexToJson(refs).then(parsedContents => {
                chai.expect(typeof(parsedContents)).to.equal('object');
            });
        });
        it('Correctly parses bibtex', function () {
            bibtexService.bibtexToJson(refs).then(parsedContents => {
                chai.expect(parsedContents[0]).to.have.property('type');
                chai.expect(parsedContents[0]).to.have.property('label');
                chai.expect(parsedContents[0]).to.have.property('properties');
            });
        });
    });
});