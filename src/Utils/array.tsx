/**
 * @param array an array of T
 * @param predicate a function that return true or false given a T
 * @returns the number of items in the array that return true
 */
export function count<T>(array: T[], predicate: (it: T) => boolean): number {
    const reduceCount = (acc: number, item: T) => {
        return acc + (predicate(item) ? 1 : 0);
    };
    return array.reduce((acc, curr, i, list) => reduceCount(acc, curr), 0);
}

/**
 * @param list an array of T
 * @param index the index in list to replace
 * @param replace a function that accepts the existing item at index, and returns the new value
 */
export function replaceAtIndex<T>(
    list: T[],
    index: number,
    replace: (old: T) => T
): T[] {
    return list.map<T>((it, i, _) => {
        if (i === index) return replace(it);
        else return it;
    });
}
