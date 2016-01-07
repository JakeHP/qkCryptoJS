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

        // sender measures channel photons, *SHOULD* be 100% accurate, but won't due to attacker.
        var newUnmeasuredPhotons = channel.Photons.splice(0);
        var newlyMeasuredPhotons = [];
        for (var i = 0; i < newUnmeasuredPhotons.length; i++) {
            newlyMeasuredPhotons[i] = newUnmeasuredPhotons[i].measure(senderBaseComm.randomBasis[i]);
        }

        // sender measure sender's own photons, 100% accuracy
        var originalUnmeasuredPhotons = senderBaseComm.photons.splice(0);
        var originalMeasuredPhotons = [];
        for (var i = 0; i < originalUnmeasuredPhotons.length; i++) {
            originalMeasuredPhotons[i] = originalUnmeasuredPhotons[i].measure(senderBaseComm.randomBasis[i]);
        }

        assert.notDeepEqual(newlyMeasuredPhotons, originalMeasuredPhotons);

        var differences = 0;
        for (var i = 0; i < newlyMeasuredPhotons.length; i++) {
            if (newlyMeasuredPhotons[i] !== originalMeasuredPhotons[i]) {
                differences++;
            }
        }
        assert.isTrue(differences > 15);
    });
});
