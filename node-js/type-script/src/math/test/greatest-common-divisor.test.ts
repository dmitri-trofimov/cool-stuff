import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { gcd } from '../greatest-common-divisor.ts';

describe('gcd', () => {
  describe('basic cases', () => {
    it('should compute gcd of two positive integers', () => {
      assert.strictEqual(gcd(48, 18), 6);
      assert.strictEqual(gcd(100, 50), 50);
      assert.strictEqual(gcd(17, 19), 1);
    });

    it('should handle identical numbers', () => {
      assert.strictEqual(gcd(42, 42), 42);
      assert.strictEqual(gcd(1, 1), 1);
    });

    it('should handle one being zero', () => {
      assert.strictEqual(gcd(5, 0), 5);
      assert.strictEqual(gcd(0, 5), 5);
      assert.strictEqual(gcd(0, 0), 0);
    });

    it('should handle one dividing the other', () => {
      assert.strictEqual(gcd(100, 25), 25);
      assert.strictEqual(gcd(7, 14), 7);
    });
  });

  describe('negative numbers', () => {
    it('should handle negative numbers', () => {
      assert.strictEqual(gcd(-48, 18), 6);
      assert.strictEqual(gcd(48, -18), 6);
      assert.strictEqual(gcd(-48, -18), 6);
    });

    it('should handle negative zero', () => {
      assert.strictEqual(gcd(-5, 0), 5);
      assert.strictEqual(gcd(0, -5), 5);
    });
  });

  describe('coprime numbers', () => {
    it('should return 1 for coprime numbers', () => {
      assert.strictEqual(gcd(13, 17), 1);
      assert.strictEqual(gcd(9, 16), 1);
      assert.strictEqual(gcd(25, 36), 1);
    });
  });

  describe('large numbers', () => {
    it('should handle large numbers efficiently', () => {
      assert.strictEqual(gcd(1071, 462), 21);
      assert.strictEqual(gcd(2520, 1260), 1260);
    });

    it('should handle Fibonacci numbers', () => {
      // gcd of consecutive Fibonacci numbers is always 1
      assert.strictEqual(gcd(89, 55), 1);
      assert.strictEqual(gcd(144, 89), 1);
    });
  });

  describe('order independence', () => {
    it('should be commutative', () => {
      assert.strictEqual(gcd(48, 18), gcd(18, 48));
      assert.strictEqual(gcd(100, 35), gcd(35, 100));
    });
  });

  describe('single digit numbers', () => {
    it('should handle single digits', () => {
      assert.strictEqual(gcd(2, 3), 1);
      assert.strictEqual(gcd(6, 9), 3);
      assert.strictEqual(gcd(8, 4), 4);
    });
  });

  describe('powers of 2', () => {
    it('should handle powers of 2 efficiently', () => {
      assert.strictEqual(gcd(16, 8), 8);
      assert.strictEqual(gcd(64, 32), 32);
      assert.strictEqual(gcd(128, 48), 16);
    });
  });

  describe('even and odd combinations', () => {
    it('should handle even and odd numbers', () => {
      assert.strictEqual(gcd(12, 15), 3);
      assert.strictEqual(gcd(20, 7), 1);
      assert.strictEqual(gcd(36, 24), 12);
    });
  });
});
