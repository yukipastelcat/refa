let chai = require('chai');
let should = chai.should();
let fs = require('fs');
let bibtexService = require('../src/services/bibtexService'),
    synonymService = require('../src/services/synonymService');

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
    let incrementAndParse = function(refs) {
        refs = refs.repeat(2);
        let object = bibtexService.bibtexToJson(refs);
        object.should.be.an('object');
        return refs;
    }
});

describe('synonymService performance', function () {
    let synonyms = [];
    let count = 1;
    it('1 synonym', function () {
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('2 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('4 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('8 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('16 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('32 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('64 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('128 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('256 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('512 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('1024 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('2048 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('4096 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('8192 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('16384 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('32768 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('65536 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    it('131072 synonyms', function () {
        count = count * 2;
        let synonym = incrementAndSearch(count);
        chai.expect(synonym).to.have.property('test');
    });
    let incrementAndSearch = function(count) {
        for (var i = 0; i < count; i++) {
            synonyms.push(`synonym${i}|synonym${i + 1}`);
        }
        let synonym = synonymService.findSynonym(new RegExp('synonym' + (count - 1), 'i'), synonyms);
        synonyms = [];
        return synonym;
    }
});