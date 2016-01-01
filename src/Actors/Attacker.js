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
            this.generateRandomBasis();
            BaseCommunicator.measurePhotonsFromChannel(channel);
            channel.Photons = BaseCommunicator.photons.slice(0);
        } else {
            throw new Error('Length of polars in channel is not same as attacker random basis.');
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
        if (BaseCommunicator.measuredPolarizations.length !== BaseCommunicator.randomBasis.length) {
            throw new Error("Length of measured polarizations does not match random basis.");
        }
        for (var i = 0; i < BaseCommunicator.measuredPolarizations.length; i++) {
            var senderBasis = this.senderBasis[i];
            var receiverBasis = this.receiverBasis[i];
            if (senderBasis === receiverBasis) {
                BaseCommunicator.sharedKey.push(BaseCommunicator.calculateBit(senderBasis, BaseCommunicator.measuredPolarizations[i]));
            }
        }
    }

    /* Base Calls */
    function generateRandomBasis() {
        BaseCommunicator.generateRandomBasis();
    }
    function getSharedKey() {
        return BaseCommunicator.sharedKey;
    }

    return {
        generateRandomBasis: generateRandomBasis,
        interceptPhotonsFromChannel: interceptPhotonsFromChannel,
        interceptSenderBasisFromChannel: interceptSenderBasisFromChannel,
        interceptReceiverBasisFromChannel: interceptReceiverBasisFromChannel,
        generateSharedKey: generateSharedKey,
        getSharedKey: getSharedKey
    };

});
