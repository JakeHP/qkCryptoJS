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
            BaseCommunicator.photonPolarizations = channel.PhotonPolarizations.slice(0);
        }
    }

    return {
        generateRandomBasis: BaseCommunicator.generateRandomBasis,
        measurePolarizationsFromChannel: measurePolarizationsFromChannel
    };

})();