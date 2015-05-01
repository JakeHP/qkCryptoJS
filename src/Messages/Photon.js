import {Degrees} from "../Constants/Polarizations.js";

export var getPhoton = (() => {

    var PolarizationState = undefined;

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
});