import * as AppConfig from "./Config/AppConfig";
import {getSender} from "./Actors/Sender.js";
import {getReceiver} from "./Actors/Receiver.js";
import {QuantumChannel} from "./Channels/QuantumChannel.js"

var Sender = getSender();
var Receiver = getReceiver();

Sender.generateRandomBits();
Sender.generateRandomBasis();
Sender.calculatePolarizations();
Sender.sendPhotonsToChannel(QuantumChannel);

Receiver.generateRandomBasis();
Receiver.measurePhotonsFromChannel(QuantumChannel);

Sender.sendBasisToChannel(QuantumChannel);
Receiver.readBasisFromChannel(QuantumChannel);

Receiver.sendBasisToChannel(QuantumChannel);
Sender.readBasisFromChannel(QuantumChannel);

Receiver.generateSharedKey();

console.log(Receiver.getSharedKey());
console.log(Receiver.getSharedKey().length);