require("babel/polyfill");

import {getPhoton} from "../Messages/Photon.js"
import {getBaseCommunicator} from "./BaseCommunicator.js";
import {PhotonsSize} from "../Config/AppConfig.js";
import {Degrees} from "../Constants/Polarizations.js";
import {Diagonal, Rectangular} from "../Constants/Bases.js";

export var getReceiver = (() => {

    var BaseCommunicator = getBaseCommunicator();
    var measuredPolarizations = [];

    function generateRandomBasis(){
        BaseCommunicator.randomBasis = BaseCommunicator.generateRandomBasis();
    }

    function calculateBit(basis, polarization) {
        if(basis !== Diagonal && basis !== Rectangular){
            throw `Receiver.js - calculateBit() - Invalid parameters. Basis: ${basis} Polarization: ${polarization}`;
        }
        if(basis === Rectangular){
            if(polarization === Degrees.Zero){
                return 0;
            }else{
                return 1;
            }
        }else{
            if(polarization === Degrees.FortyFive){
                return 0;
            }else{
                return 1;
            }
        }
    }

    function measurePhotonsFromChannel(channel){
        if(BaseCommunicator.isValidChannel(channel)){
            this.measuredPolarizations = [];
            BaseCommunicator.photons = channel.Photons.slice(0);
            if(BaseCommunicator.photons.length === BaseCommunicator.randomBasis.length){
                for(var i=0; i<BaseCommunicator.photons.length; i++){
                    var basis = BaseCommunicator.randomBasis[i];
                    this.measuredPolarizations[i] = BaseCommunicator.photons[i].measure(basis);
                }
            }else{
                throw "Receiver.js - measurePolarizationsFromChannel() - Length of sender polars is not same as receiver random basis.";
            }
        }
    }

    return {
        measuredPolarizations: measuredPolarizations,
        generateRandomBasis: generateRandomBasis,
        measurePhotonsFromChannel: measurePhotonsFromChannel,
        sendBasisToChannel: BaseCommunicator.sendBasisToChannel,
        readBasisFromChannel: BaseCommunicator.readBasisFromChannel
    };

});