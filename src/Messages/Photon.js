import * as Polarizations from "../Constants/Polarizations.js";

export var Photon = (function(){

    var PolarizationState = undefined;

    function isValidState(state){
        for (var polarization in Polarizations){
            if(Polarizations[polarization] === state){
                return true;
            }
        }
        throw "Photon.js - isValidState() - Invalid State Provided - State: " + state;
    }

    function setState(state){
        if(isValidState(state)){
            PolarizationState = state;
        }
    }

    function getState(){
        return PolarizationState;
    }

    return {
        getState: getState,
        setState: setState
    }
}());