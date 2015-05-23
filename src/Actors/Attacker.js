import {getBaseCommunicator} from "./BaseCommunicator.js";

export var getAttacker = (() => {

    var BaseCommunicator = getBaseCommunicator(),
        measuredPolarizations = [],
        senderBasis = [],
        receiverBasis = [];

    function interceptPhotonsFromChannel(channel) {
        if (BaseCommunicator.isValidChannel(channel)) {
            this.generateRandomBasis();
            this.measurePhotonsFromChannel(channel);
            channel.Photons = BaseCommunicator.photons.slice(0);
        } else {
            throw `Attacker.js - interceptPhotonsFromChannel() - Length of polars in channel is not same as attacker random basis.`;
        }
    }

    function measurePhotonsFromChannel(channel) {
        this.measuredPolarizations = [];
        BaseCommunicator.photons = channel.Photons.slice(0);
        if (BaseCommunicator.photons.length === BaseCommunicator.randomBasis.length) {
            for (var i = 0; i < BaseCommunicator.photons.length; i++) {
                var basis = BaseCommunicator.randomBasis[i];
                this.measuredPolarizations[i] = BaseCommunicator.photons[i].measure(basis);
            }
        } else {
            throw `Attacker.js - measurePolarizationsFromChannel() - Length of polars in channel is not same as attacker random basis.`;
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
        // TODO
    }

    /* Base Calls */
    function generateRandomBasis() {
        BaseCommunicator.generateRandomBasis();
    }

    return {
        generateRandomBasis: generateRandomBasis,
        interceptPhotonsFromChannel: interceptPhotonsFromChannel,
        measurePhotonsFromChannel: measurePhotonsFromChannel,
        interceptSenderBasisFromChannel: interceptSenderBasisFromChannel,
        interceptReceiverBasisFromChannel: interceptReceiverBasisFromChannel
    };

});
