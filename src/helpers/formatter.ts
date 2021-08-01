export function timeFormatter(time: number): string {
    let mins = Math.floor(time / 1000 / 60);
    let secs = (time / 1000) % 60;

    return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function numberFormatter(n: number | string | undefined): {
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
        result.formattedNumber = (num / 1_000_000).toFixed(2);
        result.satuan = "M";
    } else if (num > 999) {
        result.formattedNumber = (num / 1_000).toFixed(2);
        result.satuan = "K";
    } else {
        result.formattedNumber = String(num);
    }

    return result;
}
