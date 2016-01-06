import { getPhoton } from "../Messages/Photon.js"
import { getBaseCommunicator } from "./BaseCommunicator.js";
import { PhotonsSize } from "../Config/AppConfig.js";
import { Degrees } from "../Constants/Polarizations.js";
import { Diagonal, Rectangular } from "../Constants/Bases.js";
import { getBitUtil } from "../Utils/Bit.js";

export var getSender = ((baseCommObserver, bitUtil) => {

    var BaseCommunicator = undefined;
    if (baseCommObserver) {
        BaseCommunicator = baseCommObserver;
    } else {
        BaseCommunicator = getBaseCommunicator();
    }
    var BitUtil = undefined;
    if (bitUtil) {
        BitUtil = bitUtil;
    } else {
        BitUtil = getBitUtil();
    }
    var randomBits = undefined;

    function calculatePolarization(bit, basis) {
        if ((bit !== 0 && bit !== 1) || (basis !== Diagonal && basis !== Rectangular)) {
            throw new Error(`Invalid parameters. Bit: ${bit} Basis: ${basis}`);
        }
        if (basis === Rectangular) {
            if (bit === 0) {
                return Degrees.Zero;
            } else {
                return Degrees.Ninety;
            }
        } else {
            if (bit === 0) {
                return Degrees.FortyFive;
            } else {
                return Degrees.OneHundredThirtyFive;
            }
        }
    }

    function calculatePolarizations() {
        if (randomBits === undefined || BaseCommunicator.randomBasis === undefined) {
            throw new Error('randomBits || randomBasis not generated.');
        }
        if (randomBits.length !== BaseCommunicator.randomBasis.length) {
            throw new Error('Number of bits is not same as number of basis.');
        }
        for (var i = 0; i < randomBits.length; i++) {
            var photon = getPhoton();
            var polarization = calculatePolarization(randomBits[i], BaseCommunicator.randomBasis[i]);
            photon.setState(polarization);
            photon.setBasis(BaseCommunicator.randomBasis[i]);
            BaseCommunicator.photons.push(photon);
        }
    }

    function sendPhotonsToChannel(channel) {
        if (BaseCommunicator.isValidChannel(channel)) {
            channel.Photons = BaseCommunicator.photons.slice(0);
        }
    }

    function generateSharedKey() {
        if (BaseCommunicator.randomBasis.length !== BaseCommunicator.otherBasis.length) {
            throw new Error('Length of random basis and other basis are not equal.');
        }
        if (randomBits.length !== BaseCommunicator.randomBasis.length) {
            throw new Error('Length of random bits and random basis are not equal.');
        }
        for (var i = 0; i < randomBits.length; i++) {
            var basis = BaseCommunicator.randomBasis[i];
            var otherBasis = BaseCommunicator.otherBasis[i];
            if (basis === otherBasis) {
                BaseCommunicator.sharedKey.push(randomBits[i]);
            }
        }
    }

    function generateRandoms() {
        randomBits = BitUtil.generateRandomBits(PhotonsSize);
        BaseCommunicator.generateRandomBasis();
    }

    return {
        generateRandoms: generateRandoms,
        calculatePolarizations: calculatePolarizations,
        sendPhotonsToChannel: sendPhotonsToChannel,
        sendBasisToChannel: BaseCommunicator.sendBasisToChannel.bind(BaseCommunicator),
        readBasisFromChannel: BaseCommunicator.readBasisFromChannel.bind(BaseCommunicator),
        generateSharedKey: generateSharedKey,
        getSharedKey: BaseCommunicator.getSharedKey.bind(BaseCommunicator),
        readDecisionFromChannel: BaseCommunicator.readDecisionFromChannel.bind(BaseCommunicator),
        decide: BaseCommunicator.decide.bind(BaseCommunicator),
        getDecision: BaseCommunicator.getDecision.bind(BaseCommunicator),
        sendDecisionToChannel: BaseCommunicator.sendDecisionToChannel.bind(BaseCommunicator)
    };

});
