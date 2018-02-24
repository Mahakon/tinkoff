const expect = require('expect');
const getMinMax = require('../getMinMax');
const printNumbers = require('../printNumbers');
const rle = require('../rle');

describe('test1', () => {

    it('getMinMax', () => {
        expect(
            getMinMax('1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028')
        ).toEqual({
            min: -1028,
            max: 15
        });
    });

});

describe('test2', () => {

    it('rle', () => {
        expect(
            rle('AAAB')
        ).toEqual('A3B');
    });

});

describe('test3', () => {

    it('printNumbers', () => {
        expect(
            printNumbers(11, 3)
        ).toEqual(
            '0  4  8\n' +
            '1  5  9\n' +
            '2  6 10\n' +
            '3  7 11'
        );
    });

});