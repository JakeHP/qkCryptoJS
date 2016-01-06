import 'babel-polyfill';
import * as AppConfig from "./src/Config/AppConfig";
import { getSender } from "./src/Actors/Sender.js";
import { getReceiver } from "./src/Actors/Receiver.js";
import { getAttacker } from "./src/Actors/Attacker.js";
import { getQuantumChannel } from "./src/Channels/QuantumChannel.js";

var Sender = getSender();
var Receiver = getReceiver();
var Attacker = getAttacker();
var QuantumChannel = getQuantumChannel();

Sender.generateRandoms();
Sender.calculatePolarizations();
Sender.sendPhotonsToChannel(QuantumChannel);

Attacker.interceptPhotonsFromChannel(QuantumChannel);

Receiver.generateRandomBasis();
Receiver.measurePhotonsFromChannel(QuantumChannel);

Sender.sendBasisToChannel(QuantumChannel);
Attacker.interceptSenderBasisFromChannel(QuantumChannel);
Receiver.readBasisFromChannel(QuantumChannel);

Receiver.sendBasisToChannel(QuantumChannel);
Attacker.interceptReceiverBasisFromChannel(QuantumChannel);
Sender.readBasisFromChannel(QuantumChannel);

Receiver.generateSharedKey();
Attacker.generateSharedKey();
Sender.generateSharedKey();

Sender.decide();
Receiver.decide();

Sender.sendDecisionToChannel(QuantumChannel);
Receiver.readDecisionFromChannel(QuantumChannel);

Receiver.sendDecisionToChannel(QuantumChannel);
Sender.readDecisionFromChannel(QuantumChannel);
