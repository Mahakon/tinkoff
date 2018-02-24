const expect = require('expect');
const fibonacciSimple = require('../fibonacciSimple');
const fibonacciWithCache = require('../fibonacciWithCache');

describe('comparing time', () => {

    it('fibonacciSimple', () => {
        expect(
            fibonacciSimple(22)
        ).toEqual(17711);
    });

});

describe('comparing time', () => {

    it('fibonacciWithCache', () => {
        expect(
            fibonacciWithCache(22)
        ).toEqual(17711);
    });

});

