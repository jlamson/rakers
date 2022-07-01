export function parseIntStrict(value: string): number {
    if (/^[-+]?(\d+|Infinity)$/.test(value)) {
        return Number(value);
    } else {
        return NaN;
    }
}
