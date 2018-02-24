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

/**
 * Напишите рекурсивную функцию вычисления чисел Фибоначчи
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciSimple(x) {
    /*
    * 0 1 1 2 3 ... такой ряд 0 элемент это 0; 1 - 1
    * */

    if (x < 0) throw new Error("cant be negative");

    return (x < 2) ?
        x :
        fibonacciSimple(x - 1) + fibonacciSimple(x - 2)
}

/**
 * Напишите функцию для вычисления числа Фибоначчи с мемоизацией:
 * при повторных вызовах функция не вычисляет значения, а достает из кеша.
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciWithCache(x) {
    function memoize(fn) {
        let cache = {};
        return function (arg) {
            let n = arg;
            if (n in cache) {
                return cache[n];
            }
            else {
                let result = fn(n);
                cache[n] = result;
                return result;
            }
        }
    }

    const count = memoize(function (x) {
        if (x < 0) throw new Error("cant be negative");

        return (x < 2) ?
            x :
            count(x - 1) + count(x - 2);
    });

    return count(x)
}

/**
 * Напишите функцию printNumbers, выводящую числа в столбцах
 * так, чтобы было заполнено максимальное число столбцов при
 * минимальном числе строк.
 * Разделитель межу числами в строке - один пробел,
 * на каждое число при печати - отводится 2 символа
 * Пример работы: printNumbers(11, 3)
 *  0  4  8
 *  1  5  9
 *  2  6 10
 *  3  7 11
 * @param  {number} max  максимальное число (до 99)
 * @param  {number} cols количество столбцов
 * @return {string}
 */
function printNumbers(max, cols) {
    function defineSizeOfMatrix(max, cols) {
        return {
            y: Math.ceil((max + 1) / cols),
            x: (max + 1) / Math.ceil((max + 1) / cols)
        }
    }

    if (cols < 1) throw new Error('cols should be positive');

    let output = "";

    let size = defineSizeOfMatrix(max, cols);

    for (let i = 0; i < size.y; i++) {
        for (let j = 0; j < size.x; j++) {
            if (i + size.y * j <= max) {
                output += i + size.y * j;
            }

            if (j + 1 < size.x) {
                if ((i + size.y * (j + 1)).toString().length == 1) {
                    output += "  ";
                } else {
                    output += " ";
                }
            }

        }
        if (i != size.y - 1) output += "\n";
    }

    return output;
}

/**
 * Реализуйте RLE-сжатие: AAAB -> A3B, BCCDDDEEEE -> BC2D3E4
 * @param  {string} value
 * @return {string}
 */
/**
 * Реализуйте RLE-сжатие: AAAB -> A3B, BCCDDDEEEE -> BC2D3E4
 * @param  {string} value
 * @return {string}
 */
function rle(input) {
    function countSameSimbols(arr, curPosition) {
        let num = 1;

        while (curPosition + 1 < arr.length
        && arr[curPosition + 1] === arr[curPosition]) {

            num ++;
            curPosition++;
        }

        return num;
    }

    let array = input.split(''), i = 0;
    let output = "";

    while (i < array.length) {
        output += array[i];

        let number = countSameSimbols(array, i);

        i += number - 1;

        if (number != 1) {
            output += number
        }

        i++;
    }

    return output;
}