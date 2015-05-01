require("babel/polyfill");

import {getPhoton} from "../Messages/Photon.js"
import {baseCommunicator} from "./BaseCommunicator.js";
import {PhotonPulseSize} from "../Config/AppConfig.js";
import {Degrees} from "../Constants/Polarizations.js";
import {Diagonal, Rectangular} from "../Constants/Bases.js";

export var Sender = (() => {

    function* bitGenerator(){
        var i=0;
        while(i<PhotonPulseSize){
            i++;
            yield Math.floor(Math.random() * (2));
        }
    }

    function generateRandomBits(){
        this.randomBits = [];
        var gen = bitGenerator();
        var i = gen.next().value;
        while(i !== undefined){
            i = gen.next().value;
            if(i !== undefined){
                this.randomBits.push(i);
            }
        }
    }

    function calculatePolarization(bit, basis){
        if((bit !== 0 && bit !== 1) || (basis !== Diagonal && basis !== Rectangular)){
            throw "Sender.js - calculatePolarization() - Invalid parameters. Bit: ${bit} Basis: ${basis}";
        }
        if(basis === Rectangular){
            if(bit === 0){
                return Degrees.Zero;
            }else{
                return Degrees.Ninety;
            }
        }else{
            if(bit === 0){
                return Degrees.FortyFive;
            }else{
                return Degrees.OneHundredThirtyFive;
            }
        }
    }

    return {
        generateRandomBits: generateRandomBits,
        generateRandomBasis: baseCommunicator.generateRandomBasis
    };

})();