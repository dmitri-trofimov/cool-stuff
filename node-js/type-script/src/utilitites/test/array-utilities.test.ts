import { chunk } from '../array-utilities';

describe('chunk', () => {
  it('should split an array into chunks of the specified size', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8];
    const chunkSize = 3;
    const expected = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8],
    ];
    expect(chunk(array, chunkSize)).toEqual(expected);
  });

  it('should handle arrays that are evenly divisible', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const chunkSize = 2;
    const expected = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    expect(chunk(array, chunkSize)).toEqual(expected);
  });

  it('should return an empty array if the input array is empty', () => {
    const array: number[] = [];
    const chunkSize = 3;
    const expected: number[][] = [];
    expect(chunk(array, chunkSize)).toEqual(expected);
  });

  it('should handle a chunk size of 1', () => {
    const array = [1, 2, 3];
    const chunkSize = 1;
    const expected = [[1], [2], [3]];
    expect(chunk(array, chunkSize)).toEqual(expected);
  });

  it('should return a single chunk if the chunk size is larger than the array length', () => {
    const array = [1, 2, 3, 4, 5];
    const chunkSize = 10;
    const expected = [[1, 2, 3, 4, 5]];
    expect(chunk(array, chunkSize)).toEqual(expected);
  });

  it('should throw an error if chunk size is 0', () => {
    const array = [1, 2, 3];
    const chunkSize = 0;
    expect(() => chunk(array, chunkSize)).toThrow('Chunk size must be greater than 0.');
  });

  it('should throw an error if chunk size is negative', () => {
    const array = [1, 2, 3];
    const chunkSize = -1;
    expect(() => chunk(array, chunkSize)).toThrow('Chunk size must be greater than 0.');
  });
});
