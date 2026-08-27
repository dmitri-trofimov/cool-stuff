import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { chunk, binarySearch, groupBy } from '../array-utilities.ts';

describe('chunk', () => {
  it('should split an array into chunks of the specified size', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8];
    const chunkSize = 3;
    const expected = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8],
    ];
    assert.deepStrictEqual(chunk(array, chunkSize), expected);
  });

  it('should handle arrays that are evenly divisible', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const chunkSize = 2;
    const expected = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    assert.deepStrictEqual(chunk(array, chunkSize), expected);
  });

  it('should return an empty array if the input array is empty', () => {
    const array: number[] = [];
    const chunkSize = 3;
    const expected: number[][] = [];
    assert.deepStrictEqual(chunk(array, chunkSize), expected);
  });

  it('should handle a chunk size of 1', () => {
    const array = [1, 2, 3];
    const chunkSize = 1;
    const expected = [[1], [2], [3]];
    assert.deepStrictEqual(chunk(array, chunkSize), expected);
  });

  it('should return a single chunk if the chunk size is larger than the array length', () => {
    const array = [1, 2, 3, 4, 5];
    const chunkSize = 10;
    const expected = [[1, 2, 3, 4, 5]];
    assert.deepStrictEqual(chunk(array, chunkSize), expected);
  });

  it('should throw an error if chunk size is 0', () => {
    const array = [1, 2, 3];
    const chunkSize = 0;
    assert.throws(() => chunk(array, chunkSize), { message: 'Chunk size must be greater than 0.' });
  });

  it('should throw an error if chunk size is negative', () => {
    const array = [1, 2, 3];
    const chunkSize = -1;
    assert.throws(() => chunk(array, chunkSize), { message: 'Chunk size must be greater than 0.' });
  });
});

describe('binarySearch', () => {
  it('should return the index of the first element matching the predicate', () => {
    const array = [1, 3, 5, 7, 9];
    const predicate = (x: number) => x > 4;
    assert.strictEqual(binarySearch(array, predicate), 2); // index of 5
  });

  it('should return -1 if no element matches the predicate', () => {
    const array = [1, 3, 5];
    const predicate = (x: number) => x > 10;
    assert.strictEqual(binarySearch(array, predicate), -1);
  });

  it('should work with empty array', () => {
    const array: number[] = [];
    const predicate = (x: number) => x > 5;
    assert.strictEqual(binarySearch(array, predicate), -1);
  });

  it('should return 0 if the first element matches', () => {
    const array = [5, 7, 9];
    const predicate = (x: number) => x > 3;
    assert.strictEqual(binarySearch(array, predicate), 0);
  });
});

describe('groupBy', () => {
  it('should group items by a numeric key', () => {
    const items = [1, 2, 3, 4, 5];
    const result = groupBy(items, x => x % 2);
    assert.deepStrictEqual(result.get(0), [2, 4]);
    assert.deepStrictEqual(result.get(1), [1, 3, 5]);
  });

  it('should group items by a string key', () => {
    const items = ['apple', 'banana', 'cherry', 'date'];
    const result = groupBy(items, x => x.length);
    assert.deepStrictEqual(result.get(5), ['apple']);
    assert.deepStrictEqual(result.get(6), ['banana', 'cherry']);
    assert.deepStrictEqual(result.get(4), ['date']);
  });

  it('should handle empty array', () => {
    const items: number[] = [];
    const result = groupBy(items, x => x);
    assert.strictEqual(result.size, 0);
  });

  it('should handle all items in the same group', () => {
    const items = [1, 2, 3];
    const result = groupBy(items, () => 'same');
    assert.deepStrictEqual(result.get('same'), [1, 2, 3]);
  });

  it('should work with objects', () => {
    const items = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 25 }
    ];
    const result = groupBy(items, item => item.age);
    assert.deepStrictEqual(result.get(25), [
      { name: 'Alice', age: 25 },
      { name: 'Charlie', age: 25 }
    ]);
    assert.deepStrictEqual(result.get(30), [{ name: 'Bob', age: 30 }]);
  });
});
