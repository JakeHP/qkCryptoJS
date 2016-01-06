import 'babel-polyfill';
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
chai.should();
import { getBaseCommunicator } from "../../src/Actors/BaseCommunicator.js";
import { getSender } from "../../src/Actors/Sender.js";
import { getAttacker } from "../../src/Actors/Attacker.js";
import { getQuantumChannel } from "../../src/Channels/QuantumChannel.js";
import { PhotonsSize, MinSharedKeyLength } from "../../src/Config/AppConfig.js";

describe('Sender, Channel, and Attacker', () => {
    it('attacker should make channel photons change.', () => {
        var senderBaseComm = getBaseCommunicator();
        var sender = getSender(senderBaseComm);
        var channel = getQuantumChannel();

        var attackerBaseComm = getBaseCommunicator();
        var attacker = getAttacker(attackerBaseComm);

        sender.generateRandoms();
        sender.calculatePolarizations();
        sender.sendPhotonsToChannel(channel);

        attacker.interceptPhotonsFromChannel(channel);

        // sender measure channel photons, if unchanged, *SHOULD* be 100% accurate, but won't due to attacker.
        var resultPhotons = channel.Photons.splice(0);
        var measuredPhotons = [];
        for (var i = 0; i < resultPhotons.length; i++) {
            measuredPhotons[i] = resultPhotons[i].measure(senderBaseComm.randomBasis[i]);
        }

        // sender measure sender's own photons, 100% accuracy
        var senderPhotons = senderBaseComm.photons.splice(0);
        var senderMeasuredPhotons = [];
        for (var i = 0; i < resultPhotons.length; i++) {
            senderMeasuredPhotons[i] = senderPhotons[i].measure(senderBaseComm.randomBasis[i]);
        }

        assert.notDeepEqual(measuredPhotons, senderMeasuredPhotons);
    });
});
