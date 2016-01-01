import { Diagonal, Rectangular } from "../Constants/Bases.js";
import { PhotonsSize, MinSharedKeyLength } from "../Config/AppConfig.js";
import { Degrees } from "../Constants/Polarizations.js";

export var getBaseCommunicator = (() => {

    var randomBasis = [];
    var otherBasis = [];
    var photons = [];
    var measuredPolarizations = [];
    var sharedKey = [];
    var decision = undefined;
    var otherDecision = undefined;

    //jscs:disable
    function* basisGenerator() {
        var i = 0;
        while (i <= PhotonsSize) {
            i++;
            yield (Math.floor(Math.random() * (2)) === 1) ? Diagonal : Rectangular;
        }
    }
    //jscs:enable

    function generateRandomBasis() {
        this.randomBasis = [];
        var gen = basisGenerator();
        var i = gen.next().value;
        while (i !== undefined) {
            i = gen.next().value;
            if (i !== undefined) {
                this.randomBasis.push(i);
            }
        }
    }

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

    function isValidChannel(channel) {
        if (
            channel === undefined ||
            channel.BasisUsed === undefined ||
            channel.Photons === undefined ||
            channel.Decision === undefined
        ) {
            throw new Error("Invalid channel provided.");
        }
        return true;
    }

    function readBasisFromChannel(channel) {
        if (isValidChannel(channel)) {
            this.otherBasis = channel.BasisUsed.slice(0);
        }
    }

    function sendBasisToChannel(channel) {
        if (isValidChannel(channel)) {
            channel.BasisUsed = this.randomBasis.slice(0);
        }
    }

    function measurePhotonsFromChannel(channel) {
        if (isValidChannel(channel)) {
            this.measuredPolarizations = [];
            this.photons = channel.Photons.slice(0);
            if (this.photons.length === this.randomBasis.length) {
                for (var i = 0; i < this.photons.length; i++) {
                    var basis = this.randomBasis[i];
                    this.measuredPolarizations[i] = this.photons[i].measure(basis);
                }
            } else {
                throw new Error('Length of polars in channel is not same as attacker random basis.');
            }
        }
    }

    function getSharedKey() {
        return this.sharedKey;
    }

    function readDecisionFromChannel(channel) {
        if (isValidChannel(channel)) {
            this.otherDecision = channel.Decision;
        }
    }

    function decide() {
        if (this.sharedKey === undefined || this.sharedKey.length <= 0) {
            throw new Error("Shared key is invalid.");
        }
        this.decision = (this.sharedKey.length >= MinSharedKeyLength);
    }

    function getDecision() {
        return this.decision;
    }

    function sendDecisionToChannel(channel) {
        if (isValidChannel(channel)) {
            channel.Decision = this.decision;
        }
    }

    return {
        // Props
        randomBasis: randomBasis,
        otherBasis: otherBasis,
        photons: photons,
        measuredPolarizations: measuredPolarizations,
        sharedKey: sharedKey,
        decision: decision,
        otherDecision: otherDecision,
        // Functions
        generateRandomBasis: generateRandomBasis,
        calculateBit: calculateBit,
        isValidChannel: isValidChannel,
        readBasisFromChannel: readBasisFromChannel,
        sendBasisToChannel: sendBasisToChannel,
        measurePhotonsFromChannel: measurePhotonsFromChannel,
        getSharedKey: getSharedKey,
        readDecisionFromChannel: readDecisionFromChannel,
        decide: decide,
        getDecision: getDecision,
        sendDecisionToChannel: sendDecisionToChannel
    };

});
