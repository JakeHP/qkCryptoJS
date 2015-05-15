import {getBaseCommunicator} from "./BaseCommunicator.js";

export var getAttacker = (() => {

    var BaseCommunicator = getBaseCommunicator(),
        measuredPolarizations = [];

    function interceptPhotonsFromChannel() {
        /*
          TODO
          Measure photons
          Persist photons back to channel (since photons change when measured with incorrect basis)
        */
    }

    function measurePhotonsFromChannel(channel) {
        if (BaseCommunicator.isValidChannel(channel)) {
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
    }

    /* Base Calls */
    function generateRandomBasis() {
        BaseCommunicator.generateRandomBasis();
    }

    return {
        generateRandomBasis: generateRandomBasis,
        interceptPhotonsFromChannel: interceptPhotonsFromChannel,
        measurePhotonsFromChannel: measurePhotonsFromChannel
    };

});
