import * as AppConfig from "./Config/AppConfig";
import {Photon} from "./Messages/Photon.js";
import {BaseCommunicator} from "./Actors/BaseCommunicator.js";


console.log(BaseCommunicator);
console.log(BaseCommunicator.randomBasis);
BaseCommunicator.generateRandomBasis();
console.log("Post generation:");
console.log(BaseCommunicator.randomBasis);