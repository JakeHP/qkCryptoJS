require("babel/polyfill");

import {Diagonal, Rectangular} from "../Constants/Bases.js";
import {PhotonsSize} from "../Config/AppConfig.js";

export var getBaseCommunicator = (() => {

    var randomBasis = [];
    var otherBasis = [];
    var sharedKey = [];
    var photons = [];

    function* basisGenerator(){
        var i=0;
        while(i<PhotonsSize){
            i++;
            yield (Math.floor(Math.random() * (2)) === 1) ? Diagonal : Rectangular;
        }
    }

    function generateRandomBasis(){
        var randomBasis = [];
        var gen = basisGenerator();
        var i = gen.next().value;
        while(i !== undefined){
            i = gen.next().value;
            if(i !== undefined){
                randomBasis.push(i);
            }
        }
        return randomBasis;
    }

    function isValidChannel(channel){
        if(channel === undefined || channel.BasisUsed === undefined || channel.Photons === undefined){
            throw 'BaseCommunicator.js - isValidChannel() - Invalid channel provided.';
        }
        return true;
    }

    function readBasisFromChannel(channel){
        if(isValidChannel(channel)){
            this.otherBasis = channel.BasisUsed.slice(0);
        }
    }

    function sendBasisToChannel(basis, channel){
        if(isValidChannel(channel)){
            channel.BasisUsed = basis.slice(0);
        }
    }

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