require("babel/polyfill");

import {getPhoton} from "../Messages/Photon.js"
import {getBaseCommunicator} from "./BaseCommunicator.js";
import {PhotonsSize} from "../Config/AppConfig.js";
import {Degrees} from "../Constants/Polarizations.js";
import {Diagonal, Rectangular} from "../Constants/Bases.js";

export var getSender = (() => {

    var BaseCommunicator = getBaseCommunicator(),
        randomBits = [];

    //jscs:disable
    function* bitGenerator() {
        var i = 0;
        while (i < PhotonsSize) {
            i++;
            yield Math.floor(Math.random() * (2));
        }
    }
    //jscs:enable

    function generateRandomBits() {
        this.randomBits = [];
        var gen = bitGenerator(),
            i = gen.next().value;
        while (i !== undefined) {
            i = gen.next().value;
            if (i !== undefined) {
                this.randomBits.push(i);
            }
        }
    }

    function calculatePolarization(bit, basis) {
        if ((bit !== 0 && bit !== 1) || (basis !== Diagonal && basis !== Rectangular)) {
            throw `Sender.js - calculatePolarization() - Invalid parameters. Bit: ${bit} Basis: ${basis}`;
        }
        if (basis === Rectangular) {
            if (bit === 0) {
                return Degrees.Zero;
            } else {
                return Degrees.Ninety;
            }
        } else {
            if (bit === 0) {
                return Degrees.FortyFive;
            } else {
                return Degrees.OneHundredThirtyFive;
            }
        }
    }

    function calculatePolarizations() {
        if (this.randomBits === undefined || BaseCommunicator.randomBasis === undefined) {
            throw 'Sender.js - calculatePolarizations() - randomBits || randomBasis not generated.';
        }
        if (this.randomBits.length !== BaseCommunicator.randomBasis.length) {
            throw 'Sender.js - calculatePolarizations() - Number of bits is not same as number of basis.';
        }
        for (var i = 0; i < this.randomBits.length; i++) {
            var photon = getPhoton(),
                polarization = calculatePolarization(this.randomBits[i], BaseCommunicator.randomBasis[i]);
            photon.setState(polarization);
            photon.setBasis(BaseCommunicator.randomBasis[i]);
            BaseCommunicator.photons.push(photon);
        }
    }

    function sendPhotonsToChannel(channel) {
        if (BaseCommunicator.isValidChannel(channel)) {
            channel.Photons = BaseCommunicator.photons.slice(0);
        }
    }

    function generateSharedKey() {
        if (BaseCommunicator.randomBasis.length !== BaseCommunicator.otherBasis.length) {
            throw "Sender.js - generateSharedKey() - Length of random basis and other basis are not equal.";
        }
        if (this.randomBits.length !== BaseCommunicator.randomBasis.length) {
            throw "Sender.js - generateSharedKey() - Length of random bits and random basis are not equal.";
        }
        for (var i = 0; i < this.randomBits.length; i++) {
            var basis = BaseCommunicator.randomBasis[i],
                otherBasis = BaseCommunicator.otherBasis[i];
            if (basis === otherBasis) {
                BaseCommunicator.sharedKey.push(this.randomBits[i]);
            }
        }
    }

    function generateRandomBasis() {
        BaseCommunicator.generateRandomBasis();
    }
    function sendBasisToChannel(channel) {
        BaseCommunicator.sendBasisToChannel(channel);
    }
    function readBasisFromChannel(channel) {
        BaseCommunicator.readBasisFromChannel(channel);
    }
    function getSharedKey() {
        return BaseCommunicator.sharedKey;
    }

    return {
        generateRandomBits: generateRandomBits,
        generateRandomBasis: generateRandomBasis,
        calculatePolarizations: calculatePolarizations,
        sendPhotonsToChannel: sendPhotonsToChannel,
        sendBasisToChannel: sendBasisToChannel,
        readBasisFromChannel: readBasisFromChannel,
        generateSharedKey: generateSharedKey,
        getSharedKey: getSharedKey
    };

});
