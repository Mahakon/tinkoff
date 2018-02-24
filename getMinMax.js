/**
 * найдите минимум и максимум в любой строке
 * @param  {string} string входная строка(числа отделены от других частей строки пробелами или знаками препинания)
 * @return {{min: number, max: number}} объект с минимумом и максимумом
 * '1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028' => { min: -1028, max: 15 }
 */
function getMinMax(string) {
    /*
    * не понятно как обрабатывать 213.34.43 как трактовать? поэтому не обрабытываю
    * дробное число только такого вида 23.4(или может быть запятная типо 23,5)
    * не понятно что выводить если в строке не будет ни одного числа
    * */

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n)
    }

    function isNegativeNumder(prev, cur, next) {
        if (cur.match(/[\-]/g) !== null) {
            if (next !== undefined &&
                    next.match(/\d/g) === null) {
                return false;
            }

            if (prev !== undefined &&
                    prev.match(/\d/g) !== null) {
                return false;
            }

        }

        return true;
    }

    function isRealNumber(prev, cur, next) {
        if (cur.match(/[\.]/g) !== null) {
            if (next !== undefined &&
                    next.match(/\d/g) === null) {
                return false;

            }

            if (prev !== undefined &&
                    prev.match(/\d/g) === null) {
                return false;
            }
        }

        return true
    }

    function retrieveNumberFromString(arr, curPosition) {
        if (arr[curPosition].match(/[\d\-]/g) !== null) {

            let num = "";

            while (curPosition < arr.length &&
                arr[curPosition].match(/[\s\;\!\,\?]/g) === null) {

                let prevElem = (curPosition - 1 > -1) ?
                    arr[curPosition - 1] :
                    undefined;
                let nextElem = (curPosition + 1 < arr.length) ?
                    arr[curPosition + 1] :
                    undefined;

                if (!isNegativeNumder(prevElem, arr[curPosition], nextElem)) {
                    break
                }

                if (!isRealNumber(prevElem, arr[curPosition], nextElem)) {
                    break
                }

                num += arr[curPosition];

                curPosition++;
            }

            if (isNumeric(num)) {
                return {
                    number: num,
                    currentPosition: curPosition
                }
            } else {
                return {
                    number: undefined,
                    currentPosition: curPosition
                }
            }
        } else {
            return {
                number: undefined,
                currentPosition: curPosition
            }
        }
    }

    function getNumbersFromString(stringArray, arrayForNumbers) {
        let i = 0, newNum;

        while (i < stringArray.length) {

            newNum = retrieveNumberFromString(stringArray, i);

            if (newNum.number !== undefined){
                arrayForNumbers.push(newNum.number)
            }

            i = newNum.currentPosition + 1;
        }


        return arrayForNumbers;
    }

    let array;
    try {
        array = string.split('');
    } catch (e) {
        throw new Error('should be string')
    }
    let numArray = [];

    numArray = getNumbersFromString(array, numArray);

    return {
        min: Math.min.apply(Math, numArray),
        max: Math.max.apply(Math, numArray)
    }
}

module.exports = getMinMax;