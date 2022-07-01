export function doSafe<T>(value: T | null | undefined, block: (it: T) => void) {
    if (value !== null && value !== undefined) {
        block(value as T);
    }
}
