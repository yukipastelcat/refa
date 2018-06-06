let chai = require('chai');
let should = chai.should();
let fs = require('fs');
let bibtexService = require('../src/services/bibtexService');

describe('bibtexService', function () {
    let references = fs.readFileSync('tests/bibtex/references.bib');
    let incorrectReferences = fs.readFileSync('tests/bibtex/references_incorrect.bib');
    let cyrillicReferences = fs.readFileSync('tests/bibtex/references_cyrillic.bib');
    let formatInsensitiveReferences = fs.readFileSync('tests/bibtex/references_formatinsensitive.bib');
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

    describe('Handles cyrillic', function () {
        let object = bibtexService.bibtexToJson(cyrillicReferences);
        it('Returns not empty object', function () {
            object.should.not.be.empty;
        });
        it(`Each publication has a 'bib_type' field`, function () {
            for (publication in object)
                object[publication].should.have.property('bib_type');
        });
        it(`Each publication has a 'entry_key' field`, function () {
            for (publication in object)
                object[publication].should.have.property('entry_key');
        });
    });

    describe('Correctly handles different field formatting', function () {
        let object = bibtexService.bibtexToJson(formatInsensitiveReferences);
        it(`Object has a 'bib_type' property, that has a value of 'article'`, function () {
            object[1].should.have.property('bib_type');
            chai.expect(object[1].bib_type).to.be.equal('article');
        });
        it(`Object has an 'author' property in 'fields' that has a value of 'Article Author'`, function () {
            object[1].fields.should.have.property('author');
            chai.expect(object[1].fields.author[0].family[0].text).to.be.equal('Author');
            chai.expect(object[1].fields.author[0].given[0].text).to.be.equal('Article');
        });
        it(`Object has a 'title' property in 'fields' that has a value of 'ArticleTitle'`, function () {
            object[1].fields.should.have.property('title');
            chai.expect(object[1].fields.title[0].text).to.be.equal('ArticleTitle');
        });
        it(`Object has a 'journaltitle' property in 'fields' that has a value of 'журнал Мурзилка'`, function () {
            object[1].fields.should.have.property('journaltitle');
            chai.expect(object[1].fields.journaltitle[0].text).to.be.equal('журнал Мурзилка');
        });
        it(`Object has a 'date' property in 'fields' that has a value of '2018-05'`, function () {
            object[1].fields.should.have.property('date');
            chai.expect(object[1].fields.date).to.be.equal('2018-05');
        });
    });
});