import 'babel-polyfill';
import {getBaseCommunicator} from "../../src/Actors/BaseCommunicator.js";
import {QuantumChannel} from "../../src/Channels/QuantumChannel.js";
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
chai.should();

describe('BaseCommunicator', () => {
    describe('#props', () => {
        it('exist', () => {
            var baseCommunicator = getBaseCommunicator();
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
            var baseCommunicator = getBaseCommunicator();
            baseCommunicator.should.have.property('isValidChannel');
            baseCommunicator.should.have.property('generateRandomBasis');
            baseCommunicator.should.have.property('readBasisFromChannel');
            baseCommunicator.should.have.property('sendBasisToChannel');
            baseCommunicator.should.have.property('decide');
            baseCommunicator.should.have.property('sendDecisionToChannel');
            baseCommunicator.should.have.property('readDecisionFromChannel');
        });
        it('should be functions', () => {
            var baseCommunicator = getBaseCommunicator();
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
            var baseCommunicator = getBaseCommunicator();
            expect(baseCommunicator.isValidChannel.bind({}, {})).to.throw(Error);
        });
        it('should catch invalid channel (2)', () => {
            var baseCommunicator = getBaseCommunicator();
            expect(baseCommunicator.isValidChannel.bind({}, {BasisUsed: "abc"})).to.throw(Error);
        });
        it('should not throw valid channel', () => {
            var baseCommunicator = getBaseCommunicator();
            var channel = {
                BasisUsed: "abc",
                Photons: "abc",
                Decision: "abc"
            };
            expect(baseCommunicator.isValidChannel.bind({}, channel)).to.not.throw(Error);
        });
    });
    describe('#readBasisFromChannel', () => {
        it('otherBasis should remain empty when channel is invalid.', () => {
            var baseCommunicator = getBaseCommunicator();
            expect(baseCommunicator.readBasisFromChannel.bind({}, { seoifj: "soeifj"})).to.throw(Error);
            expect(baseCommunicator.otherBasis).to.have.length(0);
        });
        it('otherBasis should adjust to channel basis when channel is valid.', () => {
            var baseCommunicator = getBaseCommunicator();
            QuantumChannel.BasisUsed = [0, 1, 3, 4, 5];
            baseCommunicator.readBasisFromChannel(QuantumChannel);
            expect(baseCommunicator.otherBasis).to.have.length(5);
        });
    });
});
