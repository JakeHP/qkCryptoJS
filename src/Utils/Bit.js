export var getBitUtil = (() => {

    var isInteger = Number.isInteger || function (value) {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };

    //jscs:disable
    function* bitGenerator(max) {
        var i = 0;
        while (i <= max) {
            i++;
            yield Math.floor(Math.random() * (2));
        }
    }
    //jscs:enable

    function generateRandomBits(max) {
        if (!isInteger(max)) {
            throw new Error('Invalid count provided.');
        }
        var bits = [];
        var gen = bitGenerator(max);
        var i = gen.next().value;
        while (i !== undefined) {
            i = gen.next().value;
            if (i !== undefined) {
                bits.push(i);
            }
        }
        return bits;
    }

    return {
        generateRandomBits: generateRandomBits
    }
});
