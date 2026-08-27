import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { getDigits } from '../digits.ts';

describe('getDigits', () => {
  it('should return an array of digits for a multi-digit number', () => {
    assert.deepStrictEqual(getDigits(123), [1, 2, 3]);
  });

  it('should return an array with a single digit for a single-digit number', () => {
    assert.deepStrictEqual(getDigits(7), [7]);
  });

  it('should return [0] for the number 0', () => {
    assert.deepStrictEqual(getDigits(0), [0]);
  });

  it('should handle a large number correctly', () => {
    assert.deepStrictEqual(getDigits(9876543210), [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
  });

  it('should throw an error for a negative number', () => {
    assert.throws(() => getDigits(-123), { message: 'Input must be a non-negative integer.' });
  });

  it('should throw an error for a non-integer number', () => {
    assert.throws(() => getDigits(12.34), { message: 'Input must be an integer.' });
  });
});
