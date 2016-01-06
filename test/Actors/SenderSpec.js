import 'babel-polyfill';
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
chai.should();
import { getBaseCommunicator } from "../../src/Actors/BaseCommunicator.js";
import { getSender } from "../../src/Actors/Sender.js";
import { getQuantumChannel } from "../../src/Channels/QuantumChannel.js";
import { Diagonal, Rectangular } from "../../src/Constants/Bases.js";
import { PhotonsSize, MinSharedKeyLength } from "../../src/Config/AppConfig.js";

describe('Sender', () => {
    describe('#function properties', () => {
        it('should be defined', () => {
            var sender = getSender();
            sender.should.have.property('calculatePolarizations');
            sender.should.have.property('sendPhotonsToChannel');
            sender.should.have.property('sendBasisToChannel');
            sender.should.have.property('readBasisFromChannel');
            sender.should.have.property('generateSharedKey');
            sender.should.have.property('decide');
            sender.should.have.property('sendDecisionToChannel');
            sender.should.have.property('readDecisionFromChannel');
            sender.should.have.property('getDecision');
            sender.should.have.property('getSharedKey');
        });
        it('should be functions', () => {
            var sender = getSender();
            assert.isFunction(sender.calculatePolarizations, 'calculatePolarizations');
            assert.isFunction(sender.sendPhotonsToChannel, 'sendPhotonsToChannel');
            assert.isFunction(sender.sendBasisToChannel, 'sendBasisToChannel');
            assert.isFunction(sender.readBasisFromChannel, 'readBasisFromChannel');
            assert.isFunction(sender.generateSharedKey, 'generateSharedKey');
            assert.isFunction(sender.decide, 'decide');
            assert.isFunction(sender.sendDecisionToChannel, 'sendDecisionToChannel');
            assert.isFunction(sender.generateSharedKey, 'generateSharedKey');
            assert.isFunction(sender.readDecisionFromChannel, 'readDecisionFromChannel');
            assert.isFunction(sender.getDecision, 'getDecision');
            assert.isFunction(sender.getSharedKey, 'getSharedKey');
        });
    });
    describe('#generateRandoms()', () => {
        it('randomBasis property should be initialized.', () => {
            var baseComm = getBaseCommunicator();
            var sender = getSender(baseComm);
            sender.generateRandoms();
            baseComm.randomBasis.should.not.be.equal(undefined);
            baseComm.randomBasis.should.not.be.equal(null);
            baseComm.randomBasis.should.not.be.equal([]);
            assert.isTrue(baseComm.randomBasis.length > 0);
        });
    });
    describe('#calculatePolarizations()', () => {
        it("should throw error when randomBits hasn't been initialized.", () => {
            var sender = getSender();
            expect(sender.calculatePolarizations.bind({}, {})).to.throw(Error);
        });
        it("should throw error when randomBasis hasn't been initialized.", () => {
            var BaseCommunicator = getBaseCommunicator();
            var sender = getSender(BaseCommunicator);
            expect(sender.calculatePolarizations.bind({}, {})).to.throw(Error);
        });
        it('should throw error when randomBasis and randomBit lengths are of different length.', () => {
            var baseComm = getBaseCommunicator();
            var bitUtil = {
                generateRandomBits: function () {
                    return [0, 1, 0];
                }
            };
            var sender = getSender(baseComm, bitUtil);
            sender.generateRandoms();
            baseComm.randomBasis = [Rectangular, Diagonal];
            expect(sender.calculatePolarizations.bind({}, {})).to.throw(Error);
        });
        it('should throw error when randomBits are not valid.', () => {
            var baseComm = getBaseCommunicator();
            var bitUtil = {
                generateRandomBits: function () {
                    return [0, 0, 2, 3];
                }
            };
            var sender = getSender(baseComm, bitUtil);
            sender.generateRandoms();
            baseComm.randomBasis = [Rectangular, Diagonal, Rectangular, Diagonal];
            expect(sender.calculatePolarizations.bind({}, {})).to.throw(Error);
        });
        it('should throw error when randomBasis are not valid.', () => {
            var baseComm = getBaseCommunicator();
            var bitUtil = {
                generateRandomBits: function () {
                    return [0, 0, 1, 1];
                }
            };
            var sender = getSender(baseComm, bitUtil);
            sender.generateRandoms();
            baseComm.randomBasis = ['X', 'T', 'X', 'T'];
            expect(sender.calculatePolarizations.bind({}, {})).to.throw(Error);
        });
        it('should not throw error when randomBasis and randomBit lengths are of same length.', () => {
            var baseComm = getBaseCommunicator();
            var bitUtil = {
                generateRandomBits: function () {
                    return [0, 0, 1, 1];
                }
            };
            var sender = getSender(baseComm, bitUtil);
            sender.generateRandoms();
            baseComm.randomBasis = [Rectangular, Diagonal, Rectangular, Diagonal];
            expect(sender.calculatePolarizations.bind({}, {})).to.not.throw(Error);
        });
        it("should make BaseCommunicator's photons array be initialized.", () => {
            var baseComm = getBaseCommunicator();
            var sender = getSender(baseComm);
            sender.generateRandoms();
            sender.calculatePolarizations();
            baseComm.photons.should.be.not.equal([]);
            baseComm.photons.should.be.not.equal(undefined);
            baseComm.photons.should.be.not.equal(null);
        });
        it("should make BaseCommunicator's photons array be of configured length.", () => {
            var baseComm = getBaseCommunicator();
            var sender = getSender(baseComm);
            sender.generateRandoms();
            sender.calculatePolarizations();
            baseComm.photons.should.have.length(PhotonsSize);
        });
    });
    describe('#sendPhotonsToChannel()', () => {
        it('should throw error when channel is invalid.', () => {
            var baseComm = getBaseCommunicator();
            var sender = getSender(baseComm);
            var channel = {
                BasisUsedz: "abc",
                Photonszzz: "abc",
                Decisionzzz: "abc"
            };
            expect(sender.sendPhotonsToChannel.bind({}, channel)).to.throw(Error);
        });
        it('should not throw error when channel is valid.', () => {
            var baseComm = getBaseCommunicator();
            var sender = getSender(baseComm);
            var channel = getQuantumChannel();
            expect(sender.sendPhotonsToChannel.bind({}, channel)).to.not.throw(Error);
        });
        it("channel's photons should be equal to the photons of the sender.", () => {
            var baseComm = getBaseCommunicator();
            var sender = getSender(baseComm);
            var channel = getQuantumChannel();
            sender.sendPhotonsToChannel(channel);
            channel.Photons.should.have.length(baseComm.photons.length);
        });
    });
    describe('#generateSharedKey()', () => {
        it('should throw error when randomBasis and otherBasis are not of equal length.', () => {
            var baseComm = getBaseCommunicator();
            baseComm.randomBasis = [Diagonal, Diagonal];
            baseComm.otherBasis = [Diagonal, Rectangular, Rectangular];
            var sender = getSender(baseComm);
            expect(sender.generateSharedKey.bind({}, {})).to.throw(Error);
        });
        it('should throw error when randomBits and randomBasis/otherBasis are not of equal length.', () => {
            var baseComm = getBaseCommunicator();
            var bitUtil = {
                generateRandomBits: function () {
                    return [0, 1];
                }
            };
            var sender = getSender(baseComm, bitUtil);
            sender.generateRandoms();
            baseComm.randomBasis = [Diagonal, Diagonal, Rectangular];
            baseComm.otherBasis = [Diagonal, Rectangular, Rectangular];
            expect(sender.generateSharedKey.bind({}, {})).to.throw(Error);
        });
        it("should generate a proper sharedkey.", () => {
            var baseComm = getBaseCommunicator();
            var bitUtil = {
                generateRandomBits: function () {
                    return [0, 1, 1];
                }
            };
            var sender = getSender(baseComm, bitUtil);
            sender.generateRandoms();
            baseComm.randomBasis = [Diagonal, Diagonal, Rectangular];
            baseComm.otherBasis = [Diagonal, Rectangular, Rectangular];
            sender.generateSharedKey();
            baseComm.sharedKey.should.have.length(2);
            assert.deepEqual(baseComm.sharedKey, [0,1]);
        });
    });
});
