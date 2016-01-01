import 'babel-polyfill';
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
chai.should();
import { getPhoton } from "../../src/Messages/Photon.js";
import { PhotonsSize, MinSharedKeyLength } from "../../src/Config/AppConfig.js";
import { Diagonal, Rectangular } from "../../src/Constants/Bases.js";
import { Degrees } from "../../src/Constants/Polarizations.js";

describe('Photon', () => {
    describe('#setState()', () => {
        it('should throw error when invalid state.', () => {
            var photon = getPhoton();
            expect(photon.setState.bind({}, "NotAState/Degrees")).to.throw(Error);
        });
        it('should not throw error when valid state.', () => {
            var photon = getPhoton();
            expect(photon.setState.bind({}, Degrees.Zero)).to.not.throw(Error);
        });
    });
    describe('#setBasis()', () => {
        it('should throw error when invalid basis.', () => {
            var photon = getPhoton();
            expect(photon.setBasis.bind({}, "NotAState/Degrees")).to.throw(Error);
        });
        it('should not throw error when valid basis.', () => {
            var photon = getPhoton();
            expect(photon.setBasis.bind({}, Diagonal)).to.not.throw(Error);
        });
    });
    describe('#measure()', () => {
        it('should throw error when measuring basis is invalid.', () => {
            var photon = getPhoton();
            expect(photon.measure.bind({}, "NotABasis")).to.throw(Error);
        });
        it('should measure correctly when measuring basis is correct (1).', () => {
            var photon = getPhoton();
            photon.setBasis(Diagonal);
            photon.setState(Degrees.Zero);
            var measured = photon.measure(Diagonal);
            measured.should.equal(Degrees.Zero);
        });
        it('should measure correctly when measuring basis is correct (2).', () => {
            var photon = getPhoton();
            photon.setBasis(Diagonal);
            photon.setState(Degrees.FortyFive);
            var measured = photon.measure(Diagonal);
            measured.should.equal(Degrees.FortyFive);
        });
        it('should measure correctly when measuring basis is correct (3).', () => {
            var photon = getPhoton();
            photon.setBasis(Diagonal);
            photon.setState(Degrees.Ninety);
            var measured = photon.measure(Diagonal);
            measured.should.equal(Degrees.Ninety);
        });
        it('should measure correctly when measuring basis is correct (4).', () => {
            var photon = getPhoton();
            photon.setBasis(Diagonal);
            photon.setState(Degrees.OneHundredThirtyFive);
            var measured = photon.measure(Diagonal);
            measured.should.equal(Degrees.OneHundredThirtyFive);
        });
        it('should measure incorrectly when measuring basis is incorrect (1).', () => {
            var photon = getPhoton();
            photon.setBasis(Diagonal);
            photon.setState(Degrees.OneHundredThirtyFive);
            var measured = photon.measure(Rectangular);
            measured.should.not.equal(Degrees.OneHundredThirtyFive);
            measured.should.not.equal(Degrees.FortyFive);
        });
        it('should measure incorrectly when measuring basis is incorrect (2).', () => {
            var photon = getPhoton();
            photon.setBasis(Rectangular);
            photon.setState(Degrees.Ninety);
            var measured = photon.measure(Diagonal);
            measured.should.not.equal(Degrees.Zero);
            measured.should.not.equal(Degrees.Ninety);
        });
    });
});
