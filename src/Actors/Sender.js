require("babel/polyfill");

import {getPhoton} from "../Messages/Photon.js"
import {getBaseCommunicator} from "./BaseCommunicator.js";
import {PhotonPolarizationsSize} from "../Config/AppConfig.js";
import {Degrees} from "../Constants/Polarizations.js";
import {Diagonal, Rectangular} from "../Constants/Bases.js";

export var Sender = (() => {

    var BaseCommunicator = getBaseCommunicator();

    function* bitGenerator() {
        var i=0;
        while(i<PhotonPolarizationsSize){
            i++;
            yield Math.floor(Math.random() * (2));
        }
    }

    function generateRandomBits() {
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

    function calculatePolarization(bit, basis) {
        if((bit !== 0 && bit !== 1) || (basis !== Diagonal && basis !== Rectangular)){
            throw `Sender.js - calculatePolarization() - Invalid parameters. Bit: ${bit} Basis: ${basis}`;
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

    function calculatePolarizations() {
        if (this.randomBits === undefined || this.randomBasis === undefined) {
            throw 'Sender.js - calculatePolarizations() - randomBits || randomBasis not generated.';
        }
        if (this.randomBits.length !== this.randomBasis.length) {
            throw 'Sender.js - calculatePolarizations() - Number of bits is not same as number of basis.';
        }
        for (var i = 0; i < this.randomBits.length; i++) {
            var photon = getPhoton();
            var polarization = calculatePolarization(this.randomBits[i], this.randomBasis[i]);
            photon.setState(polarization);
            photon.setBasis(this.randomBasis[i]);
            BaseCommunicator.photonPolarizations.push(photon);
        }
    }

    function sendPolarizationsToChannel(channel) {
        if(BaseCommunicator.isValidChannel(channel)){
            channel.PhotonPolarizations = BaseCommunicator.photonPolarizations.slice(0);
        }
    }

    return {
        generateRandomBits: generateRandomBits,
        generateRandomBasis: BaseCommunicator.generateRandomBasis,
        calculatePolarizations: calculatePolarizations,
        sendPolarizationsToChannel: sendPolarizationsToChannel,
        sendBasisToChannel: BaseCommunicator.sendBasisToChannel,
        readBasisFromChannel: BaseCommunicator.readBasisFromChannel
    };

})();