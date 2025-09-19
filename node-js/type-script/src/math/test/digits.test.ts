import { getDigits } from '../digits';

describe('getDigits', () => {
  it('should return an array of digits for a multi-digit number', () => {
    expect(getDigits(123)).toEqual([1, 2, 3]);
  });

  it('should return an array with a single digit for a single-digit number', () => {
    expect(getDigits(7)).toEqual([7]);
  });

  it('should return [0] for the number 0', () => {
    expect(getDigits(0)).toEqual([0]);
  });

  it('should handle a large number correctly', () => {
    expect(getDigits(9876543210)).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
  });

  it('should throw an error for a negative number', () => {
    expect(() => getDigits(-123)).toThrow('Input must be a non-negative integer.');
  });

  it('should throw an error for a non-integer number', () => {
    expect(() => getDigits(12.34)).toThrow('Input must be an integer.');
  });
});
