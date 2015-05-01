import * as AppConfig from "./Config/AppConfig";
import {Photon} from "./Messages/Photon.js";
import {Sender} from "./Actors/Sender.js";

Sender.generateRandomBits();
Sender.generateRandomBasis();
//Sender.calculatePolarizations();
//Sender.sendPolarizationsToChannel();

//Receiver.generateRandomBasis();
//Receiver.measurePolarizationsFromChannel();

//Sender.sendBasisToChannel();
//Receiver.readBasisFromChannel();

//Receiver.sendBasisToChannel();
//Sender.readBasisFromChannel();