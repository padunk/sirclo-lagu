export function timeFormatter(time: number): string {
    let mins = Math.floor(time / 1000 / 60);
    let secs = (time / 1000) % 60;

    return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function numberFormatter(n?: number | string): {
    formattedNumber: string;
    satuan: string;
} {
    let result = { formattedNumber: "", satuan: "" };
    if (n === undefined) {
        return result;
    }
    // change n type to number
    let num = Number(n);
    if (num > 999_999) {
        result.formattedNumber = toPreciseString(num, 1000000);
        result.satuan = "M";
    } else if (num > 999) {
        result.formattedNumber = toPreciseString(num, 1000);
        result.satuan = "K";
    } else {
        result.formattedNumber = String(num);
    }

    return result;
}

/**
 * We use this function because toFixed() will round float number
 * @param n number, number to divide
 * @param satuan number, unit to divide
 * @returns string in two decimal digit precision
 */
function toPreciseString(n: number, unit: number): string {
    let num = n / unit;
    let numStr = Number.parseFloat(String(num)).toPrecision(String(num).length);
    numStr = numStr.slice(0, numStr.indexOf(".") + 3);
    return numStr;
}
