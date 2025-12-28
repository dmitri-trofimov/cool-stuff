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
export function binarySearch(sortedArray: number[], predicate: (item: number) => boolean): number {
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
