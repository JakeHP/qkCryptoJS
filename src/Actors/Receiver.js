require("babel/polyfill");

import {getPhoton} from "../Messages/Photon.js"
import {getBaseCommunicator} from "./BaseCommunicator.js";
import {PhotonPolarizationsSize} from "../Config/AppConfig.js";
import {Degrees} from "../Constants/Polarizations.js";
import {Diagonal, Rectangular} from "../Constants/Bases.js";

export var Receiver = (() => {

    var BaseCommunicator = getBaseCommunicator();

    function measurePolarizationsFromChannel(channel){
        if(BaseCommunicator.isValidChannel(channel)){
            var unmeasuredPolarizations = channel.PhotonPolarizations.slice(0);
            if(unmeasuredPolarizations.length === BaseCommunicator.randomBasis.length){
                for(var i=0; i<unmeasuredPolarizations.length; i++){
                    var basis = BaseCommunicator.randomBasis[i];
                    //TODO
                }
            }else{
                throw "Receiver.js - measurePolarizationsFromChannel() - Length of sender polars is not same as receiver random basis.";
            }
        }
    }

    return {
        generateRandomBasis: BaseCommunicator.generateRandomBasis,
        measurePolarizationsFromChannel: measurePolarizationsFromChannel,
        sendBasisToChannel: BaseCommunicator.sendBasisToChannel,
        readBasisFromChannel: BaseCommunicator.readBasisFromChannel
    };

})();