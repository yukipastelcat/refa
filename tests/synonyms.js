let chai = require('chai'),
    expect = chai.expect(),
    synonymService = require('../src/services/synonymService');

let synonyms = [
    'synonym1|synonym2',
    'synonym3|synonym4',
    'synonym2|synonym4'
]
describe('synonymService', function () {
    describe('Get synonyms for specified word', function () {
        it('Gets synonyms for a specified word', function () {
            let word = /synonym1/i;
            let synonym = synonymService.findSynonym(word, synonyms);
            synonym.should.have.property('test');
        });
        it('Returns only first match', function () {
            let word = /synonym2/i;
            let synonym = synonymService.findSynonym(word, synonyms);
            chai.expect(synonym.toString()).to.be.equal(new RegExp(synonyms[0], 'i').toString());
        });
    });
});