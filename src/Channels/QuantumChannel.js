export var getQuantumChannel = (() => {

    var Photons = [];
    var BasisUsed = [];
    var Decision = false;

    return {
        Photons: Photons,
        BasisUsed: BasisUsed,
        Decision: Decision
    };

});
