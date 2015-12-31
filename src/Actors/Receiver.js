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
    var measuredPolarizations = [];

    function calculateBit(basis, polarization) {
        if (basis !== Diagonal && basis !== Rectangular) {
            throw new Error(`Invalid parameters. Basis: ${basis} Polarization: ${polarization}`);
        }
        if (basis === Rectangular) {
            if (polarization === Degrees.Zero) {
                return 0;
            } else {
                return 1;
            }
        }else {
            if (polarization === Degrees.FortyFive) {
                return 0;
            } else {
                return 1;
            }
        }
    }

    function measurePhotonsFromChannel(channel) {
        if (BaseCommunicator.isValidChannel(channel)) {
            this.measuredPolarizations = [];
            BaseCommunicator.photons = channel.Photons.slice(0);
            if (BaseCommunicator.photons.length === BaseCommunicator.randomBasis.length) {
                for (var i = 0; i < BaseCommunicator.photons.length; i++) {
                    var basis = BaseCommunicator.randomBasis[i];
                    this.measuredPolarizations[i] = BaseCommunicator.photons[i].measure(basis);
                }
            } else {
                throw new Error('Length of sender polars is not same as receiver random basis.');
            }
        }
    }

    function generateSharedKey() {
        if (BaseCommunicator.randomBasis.length !== BaseCommunicator.otherBasis.length) {
            throw new Error('Length of random basis and other basis are not equal.');
        }
        if (this.measuredPolarizations.length !== BaseCommunicator.randomBasis.length) {
            throw new Error('Length of measured polarizations and random basis are not equal.');
        }
        for (var i = 0; i < this.measuredPolarizations.length; i++) {
            var basis = BaseCommunicator.randomBasis[i];
            var otherBasis = BaseCommunicator.otherBasis[i];
            if (basis === otherBasis) {
                BaseCommunicator.sharedKey.push(calculateBit(basis, this.measuredPolarizations[i]));
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
    function getDecision() {
        return BaseCommunicator.decision;
    }
    function getSharedKey() {
        return BaseCommunicator.sharedKey;
    }

    return {
        measuredPolarizations: measuredPolarizations,
        generateRandomBasis: generateRandomBasis,
        measurePhotonsFromChannel: measurePhotonsFromChannel,
        sendBasisToChannel: sendBasisToChannel,
        readBasisFromChannel: readBasisFromChannel,
        generateSharedKey: generateSharedKey,
        decide: decide,
        sendDecisionToChannel: sendDecisionToChannel,
        readDecisionFromChannel: readDecisionFromChannel,
        getDecision: getDecision,
        getSharedKey: getSharedKey
    };

});
