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

describe('BaseCommunicator', () => {
    describe('#function properties', () => {
        it('should be defined', () => {
            var sender = getSender();
            sender.should.have.property('generateRandomBits');
            sender.should.have.property('generateRandomBasis');
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
            assert.isFunction(sender.generateRandomBits, 'generateRandomBits');
            assert.isFunction(sender.generateRandomBasis, 'generateRandomBasis');
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
    describe('#generateRandomBits()', () => {
        it('randomBits property should be initialized.', () => {
            var sender = getSender();
            sender.generateRandomBits();
            sender.randomBits.should.be.not.equal([]);
            sender.randomBits.should.be.not.equal(undefined);
            sender.randomBits.should.be.not.equal(null);
        });
        it('randomBits length should be equal to configured Photons Size.', () => {
            var sender = getSender();
            sender.generateRandomBits();
            sender.randomBits.should.have.length(PhotonsSize);
        });
    });
    describe('#calculatePolarizations()', () => {
        it("should throw error when randomBits hasn't been initialized.", () => {
            var sender = getSender();
            var randomBits = undefined;
            expect(sender.calculatePolarizations.bind({ randomBits: randomBits }, {})).to.throw(Error);
        });
        it("should throw error when randomBasis hasn't been initialized.", () => {
            var BaseCommunicator = getBaseCommunicator();
            var sender = getSender(BaseCommunicator);
            expect(sender.calculatePolarizations.bind({}, {})).to.throw(Error);
        });
        it('should throw error when randomBasis and randomBit lengths are of different length.', () => {
            var randomBits = [0, 1, 2];
            var BaseCommunicator = getBaseCommunicator();
            BaseCommunicator.randomBasis = [Rectangular, Diagonal];
            var sender = getSender(BaseCommunicator);
            expect(sender.calculatePolarizations.bind({ randomBits: randomBits }, {})).to.throw(Error);
        });
        it('should throw error when randomBits are not valid.', () => {
            var randomBits = [0, 0, 2, 3];
            var BaseCommunicator = getBaseCommunicator();
            BaseCommunicator.randomBasis = [Rectangular, Diagonal, Rectangular, Diagonal];
            var sender = getSender(BaseCommunicator);
            expect(sender.calculatePolarizations.bind({ randomBits: randomBits }, {})).to.throw(Error);
        });
        it('should throw error when randomBasis are not valid.', () => {
            var randomBits = [0, 0, 1, 1];
            var BaseCommunicator = getBaseCommunicator();
            BaseCommunicator.randomBasis = ['X', 'T', 'X', 'T'];
            var sender = getSender(BaseCommunicator);
            expect(sender.calculatePolarizations.bind({ randomBits: randomBits }, {})).to.throw(Error);
        });
        it('should not throw error when randomBasis and randomBit lengths are of same length.', () => {
            var randomBits = [0, 0, 1, 1];
            var BaseCommunicator = getBaseCommunicator();
            BaseCommunicator.randomBasis = [Rectangular, Diagonal, Rectangular, Diagonal];
            var sender = getSender(BaseCommunicator);
            expect(sender.calculatePolarizations.bind({ randomBits: randomBits }, {})).to.not.throw(Error);
        });
        it("should make BaseCommunicator's photons array be initialized.", () => {
            var BaseCommunicator = getBaseCommunicator();
            var sender = getSender(BaseCommunicator);
            sender.generateRandomBasis();
            sender.generateRandomBits();
            sender.calculatePolarizations();
            BaseCommunicator.photons.should.be.not.equal([]);
            BaseCommunicator.photons.should.be.not.equal(undefined);
            BaseCommunicator.photons.should.be.not.equal(null);
        });
        it("should make BaseCommunicator's photons array be of configured length.", () => {
            var BaseCommunicator = getBaseCommunicator();
            var sender = getSender(BaseCommunicator);
            sender.generateRandomBasis();
            sender.generateRandomBits();
            sender.calculatePolarizations();
            BaseCommunicator.photons.should.have.length(sender.randomBits.length);
            BaseCommunicator.photons.should.have.length(PhotonsSize);
        });
    });
    describe('#sendPhotonsToChannel()', () => {
        it('should throw error when channel is invalid.', () => {
            var BaseCommunicator = getBaseCommunicator();
            var sender = getSender(BaseCommunicator);
            var channel = {
                BasisUsedz: "abc",
                Photonszzz: "abc",
                Decisionzzz: "abc"
            };
            expect(sender.sendPhotonsToChannel.bind({}, channel)).to.throw(Error);
        });
        it('should not throw error when channel is valid.', () => {
            var BaseCommunicator = getBaseCommunicator();
            var sender = getSender(BaseCommunicator);
            var channel = getQuantumChannel();
            expect(sender.sendPhotonsToChannel.bind({}, channel)).to.not.throw(Error);
        });
        it("channel's photons should be equal to the photons of the sender.", () => {
            var BaseCommunicator = getBaseCommunicator();
            var sender = getSender(BaseCommunicator);
            var channel = getQuantumChannel();
            sender.sendPhotonsToChannel(channel);
            channel.Photons.should.have.length(BaseCommunicator.photons.length);
        });
    });
    describe('#generateSharedKey()', () => {
        it('should throw error when randomBasis and otherBasis are not of equal length.', () => {
            var BaseCommunicator = getBaseCommunicator();
            BaseCommunicator.randomBasis = [Diagonal, Diagonal];
            BaseCommunicator.otherBasis = [Diagonal, Rectangular, Rectangular];
            var sender = getSender(BaseCommunicator);
            expect(sender.generateSharedKey.bind({}, {})).to.throw(Error);
        });
        it('should throw error when randomBits and randomBasis/otherBasis are not of equal length.', () => {
            var BaseCommunicator = getBaseCommunicator();
            BaseCommunicator.randomBasis = [Diagonal, Diagonal, Rectangular];
            BaseCommunicator.otherBasis = [Diagonal, Rectangular, Rectangular];
            var sender = getSender(BaseCommunicator);
            var thisContext = {
                randomBits: [0, 1]
            };
            expect(sender.generateSharedKey.bind(thisContext, {})).to.throw(Error);
        });
        it("should generate a proper sharedkey.", () => {
            var BaseCommunicator = getBaseCommunicator();
            BaseCommunicator.randomBasis = [Diagonal, Diagonal, Rectangular];
            BaseCommunicator.otherBasis = [Diagonal, Rectangular, Rectangular];
            var sender = getSender(BaseCommunicator);
            sender.randomBits = [0, 1, 1];
            sender.generateSharedKey();
            BaseCommunicator.sharedKey.should.have.length(2);
            assert.deepEqual(BaseCommunicator.sharedKey, [0,1]);
        });
    });
});
