import { getBaseCommunicator } from "./BaseCommunicator.js";
import { Degrees } from "../Constants/Polarizations.js";
import { Diagonal, Rectangular } from "../Constants/Bases.js";

export var getAttacker = ((baseComm) => {

    var BaseCommunicator = undefined;
    if (baseComm) {
        BaseCommunicator = baseComm;
    } else {
        BaseCommunicator = getBaseCommunicator();
    }
    var senderBasis = [];
    var receiverBasis = [];

    function interceptPhotonsFromChannel(channel) {
        if (BaseCommunicator.isValidChannel(channel)) {
            BaseCommunicator.generateRandomBasis();
            BaseCommunicator.measurePhotonsFromChannel(channel);
            channel.Photons = BaseCommunicator.photons.slice(0);
        }
    }

    function interceptSenderBasisFromChannel(channel) {
        if (BaseCommunicator.isValidChannel(channel)) {
            this.senderBasis = channel.BasisUsed.slice(0);
        }
    }

    function interceptReceiverBasisFromChannel(channel) {
        if (BaseCommunicator.isValidChannel(channel)) {
            this.receiverBasis = channel.BasisUsed.slice(0);
        }
    }

    function generateSharedKey() {
        if (this.senderBasis.length !== this.receiverBasis.length) {
            throw new Error('Length of sniffed basis do not match.');
        }
        if (BaseCommunicator.randomBasis.length !== this.senderBasis.length) {
            throw new Error('Length of generated random basis does not match sniffed basis.');
        }
        for (var i = 0; i < BaseCommunicator.measuredPolarizations.length; i++) {
            var currentSenderBasis = this.senderBasis[i];
            var currentReceiverBasis = this.receiverBasis[i];
            if (currentSenderBasis === currentReceiverBasis) {
                BaseCommunicator.sharedKey.push(BaseCommunicator.calculateBit(currentSenderBasis, BaseCommunicator.measuredPolarizations[i]));
            }
        }
    }

    return {
        interceptPhotonsFromChannel: interceptPhotonsFromChannel,
        interceptSenderBasisFromChannel: interceptSenderBasisFromChannel,
        interceptReceiverBasisFromChannel: interceptReceiverBasisFromChannel,
        generateSharedKey: generateSharedKey,
        getSharedKey: BaseCommunicator.getSharedKey.bind(BaseCommunicator)
    };

});
