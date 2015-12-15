import {Diagonal, Rectangular} from "../Constants/Bases.js";
import {PhotonsSize, MinSharedKeyLength} from "../Config/AppConfig.js";

export var getBaseCommunicator = (() => {

    var randomBasis = [];
    var otherBasis = [];
    var sharedKey = [];
    var photons = [];
    var decision = undefined;
    var otherDecision = undefined;

    //jscs:disable
    function* basisGenerator() {
        var i = 0;
        while (i < PhotonsSize) {
            i++;
            yield (Math.floor(Math.random() * (2)) === 1) ? Diagonal : Rectangular;
        }
    }
    //jscs:enable

    function generateRandomBasis() {
        this.randomBasis = [];
        var gen = basisGenerator(),
            i = gen.next().value;
        while (i !== undefined) {
            i = gen.next().value;
            if (i !== undefined) {
                this.randomBasis.push(i);
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
            throw `BaseCommunicator.js - isValidChannel() - Invalid channel provided.`;
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

    function decide() {
        if (this.sharedKey === undefined || this.sharedKey.length <= 0) {
            throw `BaseCommunicator.js - decide() - Shared key is invalid.`;
        }
        this.decision = (this.sharedKey.length >= MinSharedKeyLength);
    }

    function sendDecisionToChannel(channel) {
        if (isValidChannel(channel)) {
            channel.Decision = this.decision;
        }
    }

    function readDecisionFromChannel(channel) {
        if (isValidChannel(channel)) {
            this.otherDecision = channel.Decision;
        }
    }

    return {
        photons: photons,
        randomBasis: randomBasis,
        otherBasis: otherBasis,
        sharedKey: sharedKey,
        decision: decision,
        otherDecision: otherDecision,
        isValidChannel: isValidChannel,
        generateRandomBasis: generateRandomBasis,
        readBasisFromChannel: readBasisFromChannel,
        sendBasisToChannel: sendBasisToChannel,
        decide: decide,
        sendDecisionToChannel: sendDecisionToChannel,
        readDecisionFromChannel: readDecisionFromChannel
    };

});
