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

    return {
        generateRandomBasis: BaseCommunicator.generateRandomBasis.bind(BaseCommunicator),
        sendBasisToChannel: BaseCommunicator.sendBasisToChannel.bind(BaseCommunicator),
        readBasisFromChannel: BaseCommunicator.readBasisFromChannel.bind(BaseCommunicator),
        measurePhotonsFromChannel: BaseCommunicator.measurePhotonsFromChannel.bind(BaseCommunicator),
        generateSharedKey: generateSharedKey,
        getSharedKey: BaseCommunicator.getSharedKey.bind(BaseCommunicator),
        decide: BaseCommunicator.decide.bind(BaseCommunicator),
        getDecision: BaseCommunicator.getDecision.bind(BaseCommunicator),
        sendDecisionToChannel: BaseCommunicator.sendDecisionToChannel.bind(BaseCommunicator),
        readDecisionFromChannel: BaseCommunicator.readDecisionFromChannel.bind(BaseCommunicator)
    };

});
