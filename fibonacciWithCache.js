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

module.exports = fibonacciWithCache;