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

    return {
        interceptPhotonsFromChannel: interceptPhotonsFromChannel,
        interceptSenderBasisFromChannel: interceptSenderBasisFromChannel,
        interceptReceiverBasisFromChannel: interceptReceiverBasisFromChannel
    };

});
