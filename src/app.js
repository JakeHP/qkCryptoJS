import * as AppConfig from "./Config/AppConfig";
import {getSender} from "./Actors/Sender.js";
import {getReceiver} from "./Actors/Receiver.js";
import {getAttacker} from "./Actors/Attacker.js";
import {QuantumChannel} from "./Channels/QuantumChannel.js"

var Sender = getSender(),
    Receiver = getReceiver(),
    Attacker = getAttacker();

Sender.generateRandomBits();
Sender.generateRandomBasis();
Sender.calculatePolarizations();
Sender.sendPhotonsToChannel(QuantumChannel);

Attacker.interceptPhotonsFromChannel(QuantumChannel);

Receiver.generateRandomBasis();
Receiver.measurePhotonsFromChannel(QuantumChannel);

Sender.sendBasisToChannel(QuantumChannel);
//Attacker.interceptSenderBasisFromChannel(QuantumChannel);
Receiver.readBasisFromChannel(QuantumChannel);

Receiver.sendBasisToChannel(QuantumChannel);
//Attacker.interceptReceiverBasisFromChannel(QuantumChannel);
Sender.readBasisFromChannel(QuantumChannel);

Receiver.generateSharedKey();
Sender.generateSharedKey();

Sender.decide();
Receiver.decide();

Sender.sendDecisionToChannel(QuantumChannel);
Receiver.readDecisionFromChannel(QuantumChannel);

Receiver.sendDecisionToChannel(QuantumChannel);
Sender.readDecisionFromChannel(QuantumChannel);
