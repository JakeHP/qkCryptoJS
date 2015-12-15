import 'babel-polyfill';
import {getBaseCommunicator} from "../../src/Actors/BaseCommunicator.js";
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
chai.should();

describe('BaseCommunicator', () => {
    var baseCommunicator = getBaseCommunicator();
    describe('#props', () => {
        it('exist', () => {
            baseCommunicator.should.have.property('randomBasis');
            baseCommunicator.should.have.property('otherBasis');
            baseCommunicator.should.have.property('sharedKey');
            baseCommunicator.should.have.property('photons');
            baseCommunicator.should.have.property('decision');
            baseCommunicator.should.have.property('otherDecision');
        });
    });
    describe('#function properties', () => {
        it('should be defined', () => {
            baseCommunicator.should.have.property('isValidChannel');
            baseCommunicator.should.have.property('generateRandomBasis');
            baseCommunicator.should.have.property('readBasisFromChannel');
            baseCommunicator.should.have.property('sendBasisToChannel');
            baseCommunicator.should.have.property('decide');
            baseCommunicator.should.have.property('sendDecisionToChannel');
            baseCommunicator.should.have.property('readDecisionFromChannel');
        });
        it('should be functions', () => {
            assert.isFunction(baseCommunicator.isValidChannel, 'isValidChannel');
            assert.isFunction(baseCommunicator.generateRandomBasis, 'generateRandomBasis');
            assert.isFunction(baseCommunicator.readBasisFromChannel, 'readBasisFromChannel');
            assert.isFunction(baseCommunicator.sendBasisToChannel, 'sendBasisToChannel');
            assert.isFunction(baseCommunicator.decide, 'decide');
            assert.isFunction(baseCommunicator.sendDecisionToChannel, 'sendDecisionToChannel');
            assert.isFunction(baseCommunicator.readDecisionFromChannel, 'readDecisionFromChannel');
        });
    });
    describe('#isValidChannel', () => {
        it('should catch invalid channel', () => {
            expect(baseCommunicator.isValidChannel.bind({}, {})).to.throw(Error);
        });
        it('should catch invalid channel (2)', () => {
            expect(baseCommunicator.isValidChannel.bind({}, {BasisUsed: "abc"})).to.throw(Error);
        });
        it('should not throw valid channel', () => {
            var channel = {
                BasisUsed: "abc",
                Photons: "abc",
                Decision: "abc"
            };
            expect(baseCommunicator.isValidChannel.bind({}, channel)).to.not.throw(Error);
        });
    });
});
