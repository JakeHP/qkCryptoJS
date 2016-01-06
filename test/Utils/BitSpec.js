import 'babel-polyfill';
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
chai.should();
import { getBitUtil } from "../../src/Utils/Bit.js";

describe('BitUtil', () => {
    describe('#generateRandomBits()', () => {
        it('should throw when invalid parameter is provided(1).', () => {
            var bitUtil = getBitUtil();
            expect(bitUtil.generateRandomBits.bind({}, undefined)).to.throw(Error);
        });
        it('should throw when invalid parameter is provided(2).', () => {
            var bitUtil = getBitUtil();
            expect(bitUtil.generateRandomBits.bind({}, "sefoij")).to.throw(Error);
        });
        it('should not throw when valid parameter is provided.', () => {
            var bitUtil = getBitUtil();
            expect(bitUtil.generateRandomBits.bind({}, 10)).to.not.throw(Error);
        });
        it('should generate proper random bit count.', () => {
            var bitUtil = getBitUtil();
            var bits = bitUtil.generateRandomBits(10);
            bits.should.have.length(10);
        });
        it('should only contain bits (0 / 1).', () => {
            var bitUtil = getBitUtil();
            var bits = bitUtil.generateRandomBits(10);
            bits.forEach(function (bit) {
                assert.isTrue(bit === 0 || bit === 1);
            });
        });
    });
});
