import 'babel-polyfill';
import {getBaseCommunicator} from "../../src/Actors/BaseCommunicator.js";
const chai = require('chai');
chai.should();

describe('BaseCommunicator', () => {
    var baseCommunicator = getBaseCommunicator();
    describe('#randomBasis', () => {
        it('exists', () => {
            baseCommunicator.should.have.property('randomBasis');
        });
        it('is an array', () => {
            baseCommunicator.randomBasis.should.be.a('array').with.length(0);
        });
    });
});
