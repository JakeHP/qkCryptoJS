require("babel/polyfill");

import {getPhoton} from "../Messages/Photon.js"
import {getBaseCommunicator} from "./BaseCommunicator.js";
import {PhotonsSize} from "../Config/AppConfig.js";
import {Degrees} from "../Constants/Polarizations.js";
import {Diagonal, Rectangular} from "../Constants/Bases.js";

export var getSender = (() => {

    var BaseCommunicator = getBaseCommunicator();
    var randomBits = [];

    function* bitGenerator() {
        var i=0;
        while(i<PhotonsSize){
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

    function generateRandomBasis(){
        BaseCommunicator.randomBasis = BaseCommunicator.generateRandomBasis();
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
        if (this.randomBits === undefined || BaseCommunicator.randomBasis === undefined) {
            throw 'Sender.js - calculatePolarizations() - randomBits || randomBasis not generated.';
        }
        if (this.randomBits.length !== BaseCommunicator.randomBasis.length) {
            throw 'Sender.js - calculatePolarizations() - Number of bits is not same as number of basis.';
        }
        for (var i = 0; i < this.randomBits.length; i++) {
            var photon = getPhoton();
            var polarization = calculatePolarization(this.randomBits[i], BaseCommunicator.randomBasis[i]);
            photon.setState(polarization);
            photon.setBasis(BaseCommunicator.randomBasis[i]);
            BaseCommunicator.photons.push(photon);
        }
    }

    function sendPhotonsToChannel(channel) {
        if(BaseCommunicator.isValidChannel(channel)){
            channel.Photons = BaseCommunicator.photons.slice(0);
        }
    }

    return {
        randomBits: randomBits,
        generateRandomBits: generateRandomBits,
        generateRandomBasis: generateRandomBasis,
        calculatePolarizations: calculatePolarizations,
        sendPhotonsToChannel: sendPhotonsToChannel,
        sendBasisToChannel: BaseCommunicator.sendBasisToChannel,
        readBasisFromChannel: BaseCommunicator.readBasisFromChannel
    };

});