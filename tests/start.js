let chai = require('chai');
let startService = require('../src/services/startService')

describe('startService', function () {
    it('Correctly reads app configuration', function () {
        chai.expect(startService.configuration).to.have.property('isDebug');
    });
    it('Correctly reads synonyms', function () {
        startService.synonyms.should.be.an('array');
    });
});