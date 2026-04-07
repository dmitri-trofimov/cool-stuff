export function chunk<T>(array: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) {
    throw new Error('Chunk size must be greater than 0.');
  }

  const result: T[][] = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}

/**
 * Returns the index of the first element where predicate(element) is true.
 * Assumes the array is sorted such that the predicate is false for a prefix
 * and true for the suffix (False -> True transition).
 *
 * Returns -1 if no element satisfies the condition.
 */
export function binarySearch<T = number>(sortedArray: T[], predicate: (item: T) => boolean): number {
  let low = 0;
  let high = sortedArray.length;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (predicate(sortedArray[mid])) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low < sortedArray.length ? low : -1;
}

/**
 * Groups an array of items into a Map based on a key function.
 *
 * @param items - The array of items to group.
 * @param getGroupKeyFunc - A function that takes an item and returns the key to group by.
 * @returns A Map where each key is a group key and each value is an array of items that share that key.
 *
 * @example
 * ```typescript
 * const items = [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }, { name: 'Charlie', age: 25 }];
 * const grouped = groupBy(items, item => item.age);
 * // grouped.get(25) => [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }]
 * // grouped.get(30) => [{ name: 'Bob', age: 30 }]
 * ```
 */
export function groupBy<TGroupItem, TGroupKey>(
  items: TGroupItem[],
  getGroupKeyFunc: (n: TGroupItem) => TGroupKey
): Map<TGroupKey, TGroupItem[]> {
  const map = new Map<TGroupKey, TGroupItem[]>();

  for (const item of items) {
    const groupKey = getGroupKeyFunc(item);
    const group = map.get(groupKey);

    if (group !== undefined) {
      group.push(item);
    } else {
      map.set(groupKey, [item]);
    }
  }

  return map;
}