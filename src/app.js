import * as AppConfig from "./Config/AppConfig";
import {Sender} from "./Actors/Sender.js";
import {Receiver} from "./Actors/Receiver.js";
import {QuantumChannel} from "./Channels/QuantumChannel.js"

Sender.generateRandomBits();
Sender.generateRandomBasis();
Sender.calculatePolarizations();
Sender.sendPolarizationsToChannel(QuantumChannel);

Receiver.generateRandomBasis();
//Receiver.measurePolarizationsFromChannel(QuantumChannel);

//Sender.sendBasisToChannel(QuantumChannel);
//Receiver.readBasisFromChannel(QuantumChannel);

//Receiver.sendBasisToChannel();
//Sender.readBasisFromChannel();