import { getPhoton } from "../Messages/Photon.js"
import { getBaseCommunicator } from "./BaseCommunicator.js";
import { PhotonsSize } from "../Config/AppConfig.js";
import { Degrees } from "../Constants/Polarizations.js";
import { Diagonal, Rectangular } from "../Constants/Bases.js";

export var getReceiver = ((baseComm) => {

    var BaseCommunicator = undefined;
    if (baseComm) {
        BaseCommunicator = baseComm;
    } else {
        BaseCommunicator = getBaseCommunicator();
    }

    function generateSharedKey() {
        if (BaseCommunicator.randomBasis.length !== BaseCommunicator.otherBasis.length) {
            throw new Error('Length of random basis and other basis are not equal.');
        }
        if (BaseCommunicator.measuredPolarizations.length !== BaseCommunicator.randomBasis.length) {
            throw new Error('Length of measured polarizations and random basis are not equal.');
        }
        for (var i = 0; i < BaseCommunicator.measuredPolarizations.length; i++) {
            var basis = BaseCommunicator.randomBasis[i];
            var otherBasis = BaseCommunicator.otherBasis[i];
            if (basis === otherBasis) {
                BaseCommunicator.sharedKey.push(BaseCommunicator.calculateBit(basis, BaseCommunicator.measuredPolarizations[i]));
            }
        }
    }

    /* Base Calls */
    function generateRandomBasis() {
        BaseCommunicator.generateRandomBasis();
    }
    function sendBasisToChannel(channel) {
        BaseCommunicator.sendBasisToChannel(channel);
    }
    function readBasisFromChannel(channel) {
        BaseCommunicator.readBasisFromChannel(channel);
    }
    function decide() {
        BaseCommunicator.decide();
    }
    function sendDecisionToChannel(channel) {
        BaseCommunicator.sendDecisionToChannel(channel);
    }
    function readDecisionFromChannel(channel) {
        BaseCommunicator.readDecisionFromChannel(channel);
    }
    function measurePhotonsFromChannel(channel) {
        BaseCommunicator.measurePhotonsFromChannel(channel);
    }
    function getDecision() {
        return BaseCommunicator.decision;
    }
    function getSharedKey() {
        return BaseCommunicator.sharedKey;
    }

    return {
        generateRandomBasis: generateRandomBasis,
        sendBasisToChannel: sendBasisToChannel,
        readBasisFromChannel: readBasisFromChannel,
        measurePhotonsFromChannel: measurePhotonsFromChannel,
        generateSharedKey: generateSharedKey,
        getSharedKey: getSharedKey,
        decide: decide,
        getDecision: getDecision,
        sendDecisionToChannel: sendDecisionToChannel,
        readDecisionFromChannel: readDecisionFromChannel
    };

});
