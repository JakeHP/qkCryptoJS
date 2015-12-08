import {Degrees} from "../Constants/Polarizations.js";
import {Diagonal, Rectangular} from "../Constants/Bases.js";

export var getPhoton = (() => {

    var PolarizationState = undefined;
    var Basis = undefined;

    function isValidState(state) {
        for (var prop in Degrees) {
            if (Degrees.hasOwnProperty(prop)) {
                if (Degrees[prop] === state) {
                    return true;
                }
            }
        }
        throw `Photon.js - isValidState() - Invalid State Provided - State: ${state}`;
    }

    function isValidBasis(basis) {
        if (basis === Diagonal || basis === Rectangular) {
            return true;
        }
        throw `Photon.js - isValidState() - Invalid Basis Provided - Basis: ${basis}`;
    }

    function setState(state) {
        if (isValidState(state)) {
            PolarizationState = state;
        }
    }

    function setBasis(basis) {
        if (isValidBasis(basis)) {
            Basis = basis;
        }
    }

    function measure(basisToMeasureIn) {
        if (isValidBasis(basisToMeasureIn)) {
            if (Basis === basisToMeasureIn) {
                return PolarizationState;
            }else {
                Basis = basisToMeasureIn;
                var randomPolarBit = Math.floor(Math.random() * (2));
                if (Basis === Diagonal) {
                    if (randomPolarBit === 0) {
                        return Degrees.FortyFive;
                    } else if (randomPolarBit === 1) {
                        return Degrees.OneHundredThirtyFive;
                    }
                } else if (Basis === Rectangular) {
                    if (randomPolarBit === 0) {
                        return Degrees.Zero;
                    } else if (randomPolarBit === 1) {
                        return Degrees.Ninety;
                    }
                }
            }
        }
    }

    return {
        setState: setState,
        setBasis: setBasis,
        measure: measure
    }
});
