require("babel/polyfill");

import {getPhoton} from "../Messages/Photon.js"
import {BaseCommunicator} from "./BaseCommunicator.js";
import {PhotonPolarizationsSize} from "../Config/AppConfig.js";
import {Degrees} from "../Constants/Polarizations.js";
import {Diagonal, Rectangular} from "../Constants/Bases.js";

export var Receiver = (() => {

    return {
        generateRandomBasis: BaseCommunicator.generateRandomBasis
    };

})();