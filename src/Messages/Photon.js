import {Degrees} from "../Constants/Polarizations.js";
import {Diagonal, Rectangular} from "../Constants/Bases.js";

export var getPhoton = (() => {

    var PolarizationState = undefined;
    var Basis = undefined;

    function isValidState(state){
        for (var prop in Degrees){
            if(Degrees.hasOwnProperty(prop)){
                if(Degrees[prop] === state){
                    return true;
                }
            }
        }
        throw `Photon.js - isValidState() - Invalid State Provided - State: ${state}`;
    }

    function isValidBasis(basis){
        if(basis === Diagonal || basis === Rectangular){
            return true;
        }
        throw `Photon.js - isValidState() - Invalid Basis Provided - Basis: ${basis}`;
    }

    function setState(state){
        if(isValidState(state)){
            PolarizationState = state;
        }
    }

    function setBasis(basis){
        if(isValidBasis(basis)){
            Basis = basis;
        }
    }

    function measure(){
        //TODO
    }

    return {
        setState: setState,
        setBasis: setBasis,
        measure: measure
    }
});