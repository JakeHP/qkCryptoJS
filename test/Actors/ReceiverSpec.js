import 'babel-polyfill';
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
chai.should();
import { getBaseCommunicator } from "../../src/Actors/BaseCommunicator.js";
import { getPhoton } from "../../src/Messages/Photon.js";
import { getReceiver } from "../../src/Actors/Receiver.js";
import { getQuantumChannel } from "../../src/Channels/QuantumChannel.js";
import { Diagonal, Rectangular } from "../../src/Constants/Bases.js";
import { Degrees } from "../../src/Constants/Polarizations.js";
import { PhotonsSize, MinSharedKeyLength } from "../../src/Config/AppConfig.js";

describe('Receiver', () => {
    describe('#generateRandomBasis()', () => {
        it('should call base communicator correctly.', () => {
            var baseComm = getBaseCommunicator();
            var receiver = getReceiver(baseComm);
            receiver.generateRandomBasis();
            baseComm.randomBasis.should.have.length(PhotonsSize);
        });
    });
    describe('#sendBasisToChannel()', () => {
        it('should call base communicator correctly.', () => {
            var baseComm = getBaseCommunicator();
            var receiver = getReceiver(baseComm);
            receiver.generateRandomBasis();
            var channel = getQuantumChannel();
            receiver.sendBasisToChannel(channel);
            channel.BasisUsed.should.have.length(PhotonsSize);
        });
    });
    describe('#generateSharedKey()', () => {
        it('should throw error when random basis and other basis are not of same length.', () => {
            var baseComm = getBaseCommunicator();
            baseComm.randomBasis = [Diagonal, Diagonal, Diagonal];
            var receiver = getReceiver(baseComm);
            expect(receiver.generateSharedKey).to.throw(Error);
        });
        it('should throw error when measured polars and randomBasis length are not equal.', () => {
            var baseComm = getBaseCommunicator();
            baseComm.otherBasis = [Diagonal, Rectangular, Rectangular];
            baseComm.randomBasis = [Diagonal, Diagonal, Diagonal];
            baseComm.measuredPolarizations = [Degrees.FortyFive, Degrees.Zero];
            var receiver = getReceiver(baseComm);
            expect(receiver.generateSharedKey).to.throw(Error);
        });
        it('should generate shared key (1).', () => {
            var baseComm = getBaseCommunicator();
            baseComm.otherBasis = [Diagonal, Rectangular, Rectangular];
            baseComm.randomBasis = [Diagonal, Diagonal, Diagonal];
            baseComm.measuredPolarizations = [Degrees.FortyFive, Degrees.Zero, Degrees.OneHundredThirtyFive];
            var receiver = getReceiver(baseComm);
            receiver.generateSharedKey();
            baseComm.sharedKey.should.have.length(1);
            assert.deepEqual(baseComm.sharedKey, [0]);
        });
        it('should generate shared key (2).', () => {
            var baseComm = getBaseCommunicator();
            baseComm.otherBasis = [Rectangular, Rectangular, Rectangular];
            baseComm.randomBasis = [Rectangular, Diagonal, Diagonal];
            baseComm.measuredPolarizations = [Degrees.Zero, Degrees.Zero, Degrees.OneHundredThirtyFive];
            var receiver = getReceiver(baseComm);
            receiver.generateSharedKey();
            baseComm.sharedKey.should.have.length(1);
            assert.deepEqual(baseComm.sharedKey, [0]);
        });
        it('should generate shared key (3).', () => {
            var baseComm = getBaseCommunicator();
            baseComm.otherBasis = [Rectangular, Rectangular, Rectangular];
            baseComm.randomBasis = [Rectangular, Diagonal, Diagonal];
            baseComm.measuredPolarizations = [Degrees.Ninety, Degrees.Zero, Degrees.OneHundredThirtyFive];
            var receiver = getReceiver(baseComm);
            receiver.generateSharedKey();
            baseComm.sharedKey.should.have.length(1);
            assert.deepEqual(baseComm.sharedKey, [1]);
        });
        it('should generate shared key (4).', () => {
            var baseComm = getBaseCommunicator();
            baseComm.otherBasis = [Diagonal, Rectangular, Rectangular];
            baseComm.randomBasis = [Diagonal, Diagonal, Diagonal];
            baseComm.measuredPolarizations = [Degrees.OneHundredThirtyFive, Degrees.Zero, Degrees.OneHundredThirtyFive];
            var receiver = getReceiver(baseComm);
            receiver.generateSharedKey();
            baseComm.sharedKey.should.have.length(1);
            assert.deepEqual(baseComm.sharedKey, [1]);
        });
    });
});
