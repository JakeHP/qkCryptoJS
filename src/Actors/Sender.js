require("babel/polyfill");

import {BaseCommunicator} from "./BaseCommunicator.js";
import {PhotonPulseSize} from "../Config/AppConfig.js";

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

    return {
        generateRandomBits: generateRandomBits,
        generateRandomBasis: BaseCommunicator.generateRandomBasis
    };

})();