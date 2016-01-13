import 'babel-polyfill';
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
chai.should();
import { getBaseCommunicator } from "../../src/Actors/BaseCommunicator.js";
import { getAttacker } from "../../src/Actors/Attacker.js";
import { getSender } from "../../src/Actors/Sender.js";
import { getReceiver } from "../../src/Actors/Receiver.js";
import { getQuantumChannel } from "../../src/Channels/QuantumChannel.js";
import { Diagonal, Rectangular } from "../../src/Constants/Bases.js";
import { PhotonsSize, MinSharedKeyLength } from "../../src/Config/AppConfig.js";

describe('Attacker', () => {
    describe('#interceptPhotonsFromChannel()', () => {
        it('should throw an error when channel is invalid.', () => {
            var attacker = getAttacker();
            expect(attacker.interceptPhotonsFromChannel.bind({}, { derp: "sef"})).to.throw(Error);
        });
        it('should throw an error when channel is valid, but randomBasis and channels photons are not same length.', () => {
            var baseComm = getBaseCommunicator();
            var channel = getQuantumChannel();
            var attacker = getAttacker(baseComm);
            expect(attacker.interceptPhotonsFromChannel.bind({}, channel)).to.throw(Error);
        });
        it('should generate a random basis.', () => {
            var attackerBaseComm = getBaseCommunicator();
            var channel = getQuantumChannel();
            var attacker = getAttacker(attackerBaseComm);

            var sender = getSender();
            sender.generateRandoms();
            sender.calculatePolarizations();
            sender.sendPhotonsToChannel(channel);

            attacker.interceptPhotonsFromChannel(channel);
            attackerBaseComm.randomBasis.should.have.length(PhotonsSize);
        });
        it('should intercept photons.', () => {
            var attackerBaseComm = getBaseCommunicator();
            var channel = getQuantumChannel();
            var attacker = getAttacker(attackerBaseComm);

            var sender = getSender();
            sender.generateRandoms();
            sender.calculatePolarizations();
            sender.sendPhotonsToChannel(channel);

            attacker.interceptPhotonsFromChannel(channel);
            assert.deepEqual(attackerBaseComm.photons, channel.Photons);
        });
    });
    describe('#interceptSenderBasisFromChannel()', () => {
        it('should throw an error when channel is invalid.', () => {
            var baseComm = getBaseCommunicator();
            var attacker = getAttacker(baseComm);
            expect(attacker.interceptSenderBasisFromChannel.bind({}, { derp: "abc" })).to.throw(Error);
        });
        it('should not throw an error when channel is valid.', () => {
            var baseComm = getBaseCommunicator();
            var channel = getQuantumChannel();
            var attacker = getAttacker(baseComm);
            expect(attacker.interceptSenderBasisFromChannel.bind({}, channel)).to.not.throw(Error);
        });
        it('should store sender basis correctly.', () => {
            var baseComm = getBaseCommunicator();
            var channel = getQuantumChannel();
            var basisUsed = [Diagonal, Rectangular, Diagonal];
            channel.BasisUsed = basisUsed;
            var attacker = getAttacker(baseComm);
            attacker.interceptSenderBasisFromChannel(channel);
            assert.deepEqual(attacker.senderBasis, basisUsed);
        });
    });
    describe('#interceptReceiverBasisFromChannel()', () => {
        it('should throw an error when channel is invalid.', () => {
            var baseComm = getBaseCommunicator();
            var attacker = getAttacker(baseComm);
            expect(attacker.interceptReceiverBasisFromChannel.bind({}, { derp: "abc" })).to.throw(Error);
        });
        it('should not throw an error when channel is valid.', () => {
            var baseComm = getBaseCommunicator();
            var channel = getQuantumChannel();
            var attacker = getAttacker(baseComm);
            expect(attacker.interceptReceiverBasisFromChannel.bind({}, channel)).to.not.throw(Error);
        });
        it('should store sender basis correctly.', () => {
            var baseComm = getBaseCommunicator();
            var channel = getQuantumChannel();
            var basisUsed = [Diagonal, Rectangular, Diagonal];
            channel.BasisUsed = basisUsed;
            var attacker = getAttacker(baseComm);
            attacker.interceptReceiverBasisFromChannel(channel);
            assert.deepEqual(attacker.receiverBasis, basisUsed);
        });
    });
});
