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

/*
describe('Sender, Channel, and Attacker', () => {
    it('attacker should make channel photons change.', () => {
        var senderBaseComm = getBaseCommunicator();
        var sender = getSender(senderBaseComm);
        var channel = getQuantumChannel();

        var attackerBaseComm = getBaseCommunicator();
        var attacker = getAttacker(attackerBaseComm);

        sender.generateRandomBits();
        sender.generateRandomBasis();
        sender.calculatePolarizations();
        sender.sendPhotonsToChannel(channel);

        attacker.interceptPhotonsFromChannel(channel);
        console.log(senderBaseComm.photons[0]);
        //assert.notDeepEqual(senderBaseComm.photons, channel.Photons);
    });
});
*/
