let chai = require('chai');
let startService = require('../src/services/startService')

describe('startService', function () {
    it('Correctly reads app configuration', function () {
        chai.expect(startService.configuration).to.have.property('isDebug');
    });
});