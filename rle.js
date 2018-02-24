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

module.exports = rle;