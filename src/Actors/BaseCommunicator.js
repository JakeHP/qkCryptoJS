require("babel/polyfill");

import {Diagonal, Rectangular} from "../Constants/Bases.js";
import {PhotonsSize} from "../Config/AppConfig.js";

export var getBaseCommunicator = (() => {

    var randomBasis = [],
        otherBasis = [],
        sharedKey = [],
        photons = [];
    //decision = undefined;
    //var otherDecision = undefined;

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
        if (channel === undefined || channel.BasisUsed === undefined || channel.Photons === undefined) {
            throw 'BaseCommunicator.js - isValidChannel() - Invalid channel provided.';
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

    /*
    TODO
    function sendDecisionToChannel(channel){

    }

    function readDecisionFromChannel(channel){

    }
    */

    return {
        photons: photons,
        randomBasis: randomBasis,
        otherBasis: otherBasis,
        sharedKey: sharedKey,
        isValidChannel: isValidChannel,
        readBasisFromChannel: readBasisFromChannel,
        sendBasisToChannel: sendBasisToChannel,
        generateRandomBasis: generateRandomBasis
    };

});
