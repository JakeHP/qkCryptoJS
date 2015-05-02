import * as AppConfig from "./Config/AppConfig";
import {Sender} from "./Actors/Sender.js";
import {QuantumChannel} from "./Channels/QuantumChannel.js"

Sender.generateRandomBits();
Sender.generateRandomBasis();
Sender.calculatePolarizations();
Sender.sendPolarizationsToChannel(QuantumChannel);

Receiver.generateRandomBasis();
//Receiver.measurePolarizationsFromChannel();

//Sender.sendBasisToChannel();
//Receiver.readBasisFromChannel();

//Receiver.sendBasisToChannel();
//Sender.readBasisFromChannel();