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
    var measuredPolarizations = [];
    var senderBasis = [];
    var receiverBasis = [];

    function calculateBit(basis, polarization) {
        if (basis !== Diagonal && basis !== Rectangular) {
            throw new Error(`Invalid parameters. Basis: ${basis} Polarization: ${polarization}`);
        }
        if (basis === Rectangular) {
            if (polarization === Degrees.Zero) {
                return 0;
            } else {
                return 1;
            }
        }else {
            if (polarization === Degrees.FortyFive) {
                return 0;
            } else {
                return 1;
            }
        }
    }

    function interceptPhotonsFromChannel(channel) {
        if (BaseCommunicator.isValidChannel(channel)) {
            this.generateRandomBasis();
            this.measurePhotonsFromChannel(channel);
            channel.Photons = BaseCommunicator.photons.slice(0);
        } else {
            throw new Error('Length of polars in channel is not same as attacker random basis.');
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
        if (this.measuredPolarizations.length !== BaseCommunicator.randomBasis.length) {
            throw new Error("Length of measured polarizations does not match random basis.");
        }
        for (var i = 0; i < this.measuredPolarizations.length; i++) {
            var senderBasis = this.senderBasis[i];
            var receiverBasis = this.receiverBasis[i];
            if (senderBasis === receiverBasis) {
                BaseCommunicator.sharedKey.push(calculateBit(senderBasis, this.measuredPolarizations[i]));
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
        measurePhotonsFromChannel: measurePhotonsFromChannel,
        interceptSenderBasisFromChannel: interceptSenderBasisFromChannel,
        interceptReceiverBasisFromChannel: interceptReceiverBasisFromChannel,
        generateSharedKey: generateSharedKey,
        getSharedKey: getSharedKey
    };

});
