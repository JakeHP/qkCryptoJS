require("babel/polyfill");

import {Diagonal, Rectangular} from "../Constants/Bases.js";
import {PhotonPulseSize} from "../Config/AppConfig.js";

export var BaseCommunicator = (() => {

    var randomBasis = [];
    var photonPulse = [];
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

    function setChannel(channel){
        if(channel === undefined || channel.BasisUsed === undefined || channel.PhotonPulse === undefined){
            throw "BaseCommunicator.js - setChannel() - Invalid channel provided.";
        }
        otherBasis = channel.BasisUsed;
    }

    function readBasisFromChannel(channel){
        if(channel === undefined || channel.BasisUsed === undefined){
            throw "BaseCommunicator.js - readBasisFromChannel() - Invalid channel provided.";
        }
        if(channel.BasisUsed.length === 0){
            throw "BaseCommunicator.js - readBasisFromChannel() - Channel is empty.";
        }
        otherBasis = channel.BasisUsed;
    }

    function sendBasisToChannel(channel, basis){
        if(basis === undefined || channel === undefined){
            throw "BaseCommunicator.js - sendBasisToChannel() - Invalid parameter.";
        }
        channel.BasisUsed = basis;
    }

    return {
        randomBasis: randomBasis,
        photonPulse: photonPulse,
        sharedKey: sharedKey,
        readFromChannel: readBasisFromChannel,
        sendBasisToChannel: sendBasisToChannel,
        generateRandomBasis: generateRandomBasis
    };

})();