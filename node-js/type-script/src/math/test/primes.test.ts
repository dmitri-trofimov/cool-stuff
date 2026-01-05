import { isPrime } from '../primes';

describe('isPrime', () => {
  describe('Small numbers', () => {
    it('should return false for numbers <= 1', () => {
      expect(isPrime(1)).toBe(false);
      expect(isPrime(0)).toBe(false);
      expect(isPrime(-1)).toBe(false);
      expect(isPrime(-17)).toBe(false);
    });

    it('should return true for small primes', () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(5)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(11)).toBe(true);
      expect(isPrime(13)).toBe(true);
    });

    it('should return false for small composites', () => {
      expect(isPrime(4)).toBe(false);
      expect(isPrime(6)).toBe(false);
      expect(isPrime(8)).toBe(false);
      expect(isPrime(9)).toBe(false);
      expect(isPrime(10)).toBe(false);
      expect(isPrime(25)).toBe(false);
    });
  });

  describe('Large numbers', () => {
    it('should correctly identify large primes', () => {
      expect(isPrime(104729)).toBe(true); // 10,000th prime
      expect(isPrime(1299709)).toBe(true); // 100,000th prime
      expect(isPrime(Number.MAX_SAFE_INTEGER)).toBe(false); // 2^53 - 1 is composite (divisible by 1114111)
    });

    it('should correctly identify large composites', () => {
      expect(isPrime(104728)).toBe(false);
      expect(isPrime(104730)).toBe(false);
      // 2^31 - 1 is a Mersenne prime (2147483647)
      expect(isPrime(2147483647)).toBe(true);
    });

    it('should handle the largest safe prime', () => {
      // Largest prime less than MAX_SAFE_INTEGER (9007199254740991)
      // This is 9007199254740881
      // Note: This test might take a bit longer due to O(sqrt(N)) complexity
      expect(isPrime(9007199254740881)).toBe(true);
    });
  });

  describe('Edge cases and validation', () => {
    it('should return false for non-integers', () => {
      expect(isPrime(2.5)).toBe(false);
      expect(isPrime(1.1)).toBe(false);
    });

    it('should return false for Infinity and NaN', () => {
      expect(isPrime(Infinity)).toBe(false);
      expect(isPrime(NaN)).toBe(false);
    });

    it('should return false for numbers larger than MAX_SAFE_INTEGER', () => {
      // Numbers larger than MAX_SAFE_INTEGER lose precision and cannot be reliably checked
      expect(isPrime(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
      expect(isPrime(Number.MAX_SAFE_INTEGER + 2)).toBe(false);
    });
  });
});
