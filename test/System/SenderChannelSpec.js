import 'babel-polyfill';
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
chai.should();
import { getBaseCommunicator } from "../../src/Actors/BaseCommunicator.js";
import { getSender } from "../../src/Actors/Sender.js";
import { getQuantumChannel } from "../../src/Channels/QuantumChannel.js";
import { PhotonsSize, MinSharedKeyLength } from "../../src/Config/AppConfig.js";

describe('Sender and Channel', () => {
    it('sender should send photons to channel properly.', () => {
        var baseComm = getBaseCommunicator();
        var sender = getSender(baseComm);
        var channel = getQuantumChannel();
        sender.generateRandoms();
        sender.calculatePolarizations();
        sender.sendPhotonsToChannel(channel);
        channel.Photons.should.not.be.equal(undefined);
        channel.Photons.should.not.be.equal(null);
        channel.Photons.should.not.be.equal([]);
        channel.Photons.should.have.length(PhotonsSize);
        assert.deepEqual(baseComm.photons, channel.Photons);
    });
    it('sender should send basis to channel properly.', () => {
        var baseComm = getBaseCommunicator();
        var sender = getSender(baseComm);
        var channel = getQuantumChannel();
        sender.generateRandoms();
        sender.calculatePolarizations();
        sender.sendPhotonsToChannel(channel);
        sender.sendBasisToChannel(channel);
        channel.BasisUsed.should.not.be.equal(undefined);
        channel.BasisUsed.should.not.be.equal(null);
        channel.BasisUsed.should.not.be.equal([]);
        channel.BasisUsed.should.have.length(PhotonsSize);
        assert.deepEqual(baseComm.randomBasis, channel.BasisUsed);
    });
});
