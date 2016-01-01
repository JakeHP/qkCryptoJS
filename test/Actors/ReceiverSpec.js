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

describe('Receiver', () => {
    describe('#measurePhotonsFromChannel()', () => {
        it('should throw error when an invalid channel is passed.', () => {
            var receiver = getReceiver();
            expect(receiver.measurePhotonsFromChannel.bind({}, { fake: "Channel" })).to.throw(Error);
        });
        it('should throw error when the basecomms photon and basis length are not equal.', () => {
            var baseComm = getBaseCommunicator();
            var receiver = getReceiver(baseComm);
            var channel = getQuantumChannel();
            channel.Photons.push(getPhoton());
            channel.Photons.push(getPhoton());
            channel.Photons.push(getPhoton());
            // 3 photons in channel, that get read into receiver's basecomm. No basis generated. 0 !== 3
            expect(receiver.measurePhotonsFromChannel.bind({}, channel)).to.throw(Error);
        });
        it('should measure photons.', () => {
            var baseComm = getBaseCommunicator();
            baseComm.randomBasis = [Diagonal, Diagonal, Diagonal];
            var receiver = getReceiver(baseComm);
            var channel = getQuantumChannel();
            var phoA = getPhoton();
            phoA.setState(Degrees.Zero);
            phoA.setBasis(Rectangular);
            var phoB = getPhoton();
            phoB.setState(Degrees.Ninety);
            phoB.setBasis(Rectangular);
            var phoC = getPhoton();
            phoC.setState(Degrees.FortyFive);
            phoC.setBasis(Diagonal);
            channel.Photons.push(phoA);
            channel.Photons.push(phoB);
            channel.Photons.push(phoC);
            receiver.measurePhotonsFromChannel(channel);
            receiver.measuredPolarizations.should.have.length(3);
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
            var receiver = getReceiver(baseComm);
            receiver.measuredPolarizations = [Degrees.FortyFive, Degrees.Zero];
            expect(receiver.generateSharedKey).to.throw(Error);
        });
        it('should generate shared key (1).', () => {
            var baseComm = getBaseCommunicator();
            baseComm.otherBasis = [Diagonal, Rectangular, Rectangular];
            baseComm.randomBasis = [Diagonal, Diagonal, Diagonal];
            var receiver = getReceiver(baseComm);
            receiver.measuredPolarizations = [Degrees.FortyFive, Degrees.Zero, Degrees.OneHundredThirtyFive];
            receiver.generateSharedKey();
            baseComm.sharedKey.should.have.length(1);
            assert.deepEqual(baseComm.sharedKey, [0]);
        });
        it('should generate shared key (2).', () => {
            var baseComm = getBaseCommunicator();
            baseComm.otherBasis = [Rectangular, Rectangular, Rectangular];
            baseComm.randomBasis = [Rectangular, Diagonal, Diagonal];
            var receiver = getReceiver(baseComm);
            receiver.measuredPolarizations = [Degrees.Zero, Degrees.Zero, Degrees.OneHundredThirtyFive];
            receiver.generateSharedKey();
            baseComm.sharedKey.should.have.length(1);
            assert.deepEqual(baseComm.sharedKey, [0]);
        });
        it('should generate shared key (3).', () => {
            var baseComm = getBaseCommunicator();
            baseComm.otherBasis = [Rectangular, Rectangular, Rectangular];
            baseComm.randomBasis = [Rectangular, Diagonal, Diagonal];
            var receiver = getReceiver(baseComm);
            receiver.measuredPolarizations = [Degrees.Ninety, Degrees.Zero, Degrees.OneHundredThirtyFive];
            receiver.generateSharedKey();
            baseComm.sharedKey.should.have.length(1);
            assert.deepEqual(baseComm.sharedKey, [1]);
        });
        it('should generate shared key (4).', () => {
            var baseComm = getBaseCommunicator();
            baseComm.otherBasis = [Diagonal, Rectangular, Rectangular];
            baseComm.randomBasis = [Diagonal, Diagonal, Diagonal];
            var receiver = getReceiver(baseComm);
            receiver.measuredPolarizations = [Degrees.OneHundredThirtyFive, Degrees.Zero, Degrees.OneHundredThirtyFive];
            receiver.generateSharedKey();
            baseComm.sharedKey.should.have.length(1);
            assert.deepEqual(baseComm.sharedKey, [1]);
        });
    });
});
