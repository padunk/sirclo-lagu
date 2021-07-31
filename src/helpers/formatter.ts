export function timeFormatter(time: number): string {
    let mins = Math.floor(time / 1000 / 60);
    let secs = (time / 1000) % 60;

    return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function numberFormatter(n: number): string {
    let result: string;
    if (n > 999_999) {
        result = (n / 1_000_000).toFixed(2) + "M";
    } else if (n > 999) {
        result = (n / 1_000).toFixed(2) + "K";
    } else {
        result = String(n);
    }

    return result;
}
