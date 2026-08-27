import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { isPrime } from '../primes.ts';

describe('isPrime', () => {
  describe('Small numbers', () => {
    it('should return false for numbers <= 1', () => {
      assert.strictEqual(isPrime(1), false);
      assert.strictEqual(isPrime(0), false);
      assert.strictEqual(isPrime(-1), false);
      assert.strictEqual(isPrime(-17), false);
    });

    it('should return true for small primes', () => {
      assert.strictEqual(isPrime(2), true);
      assert.strictEqual(isPrime(3), true);
      assert.strictEqual(isPrime(5), true);
      assert.strictEqual(isPrime(7), true);
      assert.strictEqual(isPrime(11), true);
      assert.strictEqual(isPrime(13), true);
    });

    it('should return false for small composites', () => {
      assert.strictEqual(isPrime(4), false);
      assert.strictEqual(isPrime(6), false);
      assert.strictEqual(isPrime(8), false);
      assert.strictEqual(isPrime(9), false);
      assert.strictEqual(isPrime(10), false);
      assert.strictEqual(isPrime(25), false);
    });
  });

  describe('Large numbers', () => {
    it('should correctly identify large primes', () => {
      assert.strictEqual(isPrime(104729), true); // 10,000th prime
      assert.strictEqual(isPrime(1299709), true); // 100,000th prime
      assert.strictEqual(isPrime(Number.MAX_SAFE_INTEGER), false); // 2^53 - 1 is composite (divisible by 1114111)
    });

    it('should correctly identify large composites', () => {
      assert.strictEqual(isPrime(104728), false);
      assert.strictEqual(isPrime(104730), false);
      // 2^31 - 1 is a Mersenne prime (2147483647)
      assert.strictEqual(isPrime(2147483647), true);
    });

    it('should handle the largest safe prime', () => {
      // Largest prime less than MAX_SAFE_INTEGER (9007199254740991)
      // This is 9007199254740881
      // Note: This test might take a bit longer due to O(sqrt(N)) complexity
      assert.strictEqual(isPrime(9007199254740881), true);
    });
  });

  describe('Edge cases and validation', () => {
    it('should return false for non-integers', () => {
      assert.strictEqual(isPrime(2.5), false);
      assert.strictEqual(isPrime(1.1), false);
    });

    it('should return false for Infinity and NaN', () => {
      assert.strictEqual(isPrime(Infinity), false);
      assert.strictEqual(isPrime(NaN), false);
    });

    it('should return false for numbers larger than MAX_SAFE_INTEGER', () => {
      // Numbers larger than MAX_SAFE_INTEGER lose precision and cannot be reliably checked
      assert.strictEqual(isPrime(Number.MAX_SAFE_INTEGER + 1), false);
      assert.strictEqual(isPrime(Number.MAX_SAFE_INTEGER + 2), false);
    });
  });
});
