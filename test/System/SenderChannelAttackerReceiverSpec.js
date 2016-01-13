import 'babel-polyfill';
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
chai.should();
import { getBaseCommunicator } from "../../src/Actors/BaseCommunicator.js";
import { getSender } from "../../src/Actors/Sender.js";
import { getReceiver } from "../../src/Actors/Receiver.js";
import { getAttacker } from "../../src/Actors/Attacker.js";
import { getQuantumChannel } from "../../src/Channels/QuantumChannel.js";
import { PhotonsSize, MinSharedKeyLength } from "../../src/Config/AppConfig.js";

describe('Sender, Channel, Receiver, and Attacker', function () {
    this.timeout(150000);
    it('#Sender And Receiver should have different keys when coming to an agreement with an Attacker listening', () => {
        var agreementCount = 0;
        var numberOfSystemRuns = 1000;

        for (var i = 0; i < numberOfSystemRuns; i++) {
            var senderBaseComm = getBaseCommunicator();
            var sender = getSender(senderBaseComm);
            var channel = getQuantumChannel();

            var receiverBaseComm = getBaseCommunicator();
            var receiver = getReceiver(receiverBaseComm);

            var attackerBaseComm = getBaseCommunicator();
            var attacker = getAttacker(attackerBaseComm);

            sender.generateRandoms();
            sender.calculatePolarizations();
            sender.sendPhotonsToChannel(channel);

            attacker.interceptPhotonsFromChannel(channel);

            receiver.generateRandomBasis();
            receiver.measurePhotonsFromChannel(channel);

            sender.sendBasisToChannel(channel);
            attacker.interceptSenderBasisFromChannel(channel);
            receiver.readBasisFromChannel(channel);

            receiver.sendBasisToChannel(channel);
            attacker.interceptReceiverBasisFromChannel(channel);
            sender.readBasisFromChannel(channel);

            receiver.generateSharedKey();
            sender.generateSharedKey();

            sender.decide();
            receiver.decide();

            sender.sendDecisionToChannel(channel);
            receiver.readDecisionFromChannel(channel);

            receiver.sendDecisionToChannel(channel);
            sender.readDecisionFromChannel(channel);
            if (receiver.getDecision() && sender.getDecision()) {
                assert.notDeepEqual(receiver.getSharedKey(), sender.getSharedKey());
                agreementCount++;
            }
        }
    });
});
