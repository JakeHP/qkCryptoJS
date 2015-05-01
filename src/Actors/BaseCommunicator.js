require("babel/polyfill");

import {Diagonal, Rectangular} from "../Constants/Bases.js";
import {PhotonPulseSize} from "../Config/AppConfig.js";

export var BaseCommunicator = (() => {

    var randomBasis = [];
    var photonPolarizationPulse = [];
    var otherBasis = [];
    var sharedKey = [];
    var channel = undefined;

    function* basisGenerator(){
        var i=0;
        while(i<PhotonPulseSize){
            i++;
            yield (Math.floor(Math.random() * (2)) === 1) ? Diagonal : Rectangular;
        }
    }

    function generateRandomBasis(){
        this.randomBasis = [];
        var gen = basisGenerator();
        var i = gen.next().value;
        while(i !== undefined){
            i = gen.next().value;
            if(i !== undefined){
                this.randomBasis.push(i);
            }
        }
    }

    function isValidChannel(channel){
        if(channel === undefined || channel.BasisUsed === undefined || channel.PhotonPulse === undefined){
            throw "BaseCommunicator.js - isValidChannel() - Invalid channel provided.";
        }
        return true;
    }

    function setChannel(channel){
        if(isValidChannel(channel)){
            this.channel = channel;
        }
    }

    function readBasisFromChannel(channel){
        if(isValidChannel(channel)){
            this.otherBasis = channel.BasisUsed;
        }
    }

    function sendBasisToChannel(channel, basis){
        if(isValidChannel(channel)){
            this.channel.BasisUsed = basis;
        }
    }

    return {
        randomBasis: randomBasis,
        otherBasis: otherBasis,
        photonPolarizationPulse: photonPolarizationPulse,
        sharedKey: sharedKey,
        readFromChannel: readBasisFromChannel,
        sendBasisToChannel: sendBasisToChannel,
        generateRandomBasis: generateRandomBasis
    };

})();