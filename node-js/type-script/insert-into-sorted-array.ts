/**
 * Inserts an element into a sorted array while maintaining the order.
 * @param arr The sorted array of elements of type T.
 * @param val The value of type T to be inserted into the array.
 * @param compareFn A comparison function that defines the sort order.
 * @returns The modified array with the new element inserted in sorted order.
 * @template T The type of elements in the array.
 */
function insertIntoSortedArray<T>(arr: T[], val: T, compareFn: (a: T, b: T) => number): T[] {
    let low = 0, high = arr.length;

    while (low < high) {
        let mid = Math.floor((low + high) / 2);

        if (compareFn(arr[mid], val) < 0) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    arr.splice(low, 0, val);
    return arr;
}
