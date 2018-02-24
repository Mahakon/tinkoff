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

module.exports = printNumbers;