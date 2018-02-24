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

module.exports = fibonacciSimple;
