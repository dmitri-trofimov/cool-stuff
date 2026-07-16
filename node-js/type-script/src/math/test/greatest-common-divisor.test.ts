import { gcd } from '../greatest-common-divisor';

describe('gcd', () => {
  describe('basic cases', () => {
    it('should compute gcd of two positive integers', () => {
      expect(gcd(48, 18)).toBe(6);
      expect(gcd(100, 50)).toBe(50);
      expect(gcd(17, 19)).toBe(1);
    });

    it('should handle identical numbers', () => {
      expect(gcd(42, 42)).toBe(42);
      expect(gcd(1, 1)).toBe(1);
    });

    it('should handle one being zero', () => {
      expect(gcd(5, 0)).toBe(5);
      expect(gcd(0, 5)).toBe(5);
      expect(gcd(0, 0)).toBe(0);
    });

    it('should handle one dividing the other', () => {
      expect(gcd(100, 25)).toBe(25);
      expect(gcd(7, 14)).toBe(7);
    });
  });

  describe('negative numbers', () => {
    it('should handle negative numbers', () => {
      expect(gcd(-48, 18)).toBe(6);
      expect(gcd(48, -18)).toBe(6);
      expect(gcd(-48, -18)).toBe(6);
    });

    it('should handle negative zero', () => {
      expect(gcd(-5, 0)).toBe(5);
      expect(gcd(0, -5)).toBe(5);
    });
  });

  describe('coprime numbers', () => {
    it('should return 1 for coprime numbers', () => {
      expect(gcd(13, 17)).toBe(1);
      expect(gcd(9, 16)).toBe(1);
      expect(gcd(25, 36)).toBe(1);
    });
  });

  describe('large numbers', () => {
    it('should handle large numbers efficiently', () => {
      expect(gcd(1071, 462)).toBe(21);
      expect(gcd(2520, 1260)).toBe(1260);
    });

    it('should handle Fibonacci numbers', () => {
      // gcd of consecutive Fibonacci numbers is always 1
      expect(gcd(89, 55)).toBe(1);
      expect(gcd(144, 89)).toBe(1);
    });
  });

  describe('order independence', () => {
    it('should be commutative', () => {
      expect(gcd(48, 18)).toBe(gcd(18, 48));
      expect(gcd(100, 35)).toBe(gcd(35, 100));
    });
  });

  describe('single digit numbers', () => {
    it('should handle single digits', () => {
      expect(gcd(2, 3)).toBe(1);
      expect(gcd(6, 9)).toBe(3);
      expect(gcd(8, 4)).toBe(4);
    });
  });

  describe('powers of 2', () => {
    it('should handle powers of 2 efficiently', () => {
      expect(gcd(16, 8)).toBe(8);
      expect(gcd(64, 32)).toBe(32);
      expect(gcd(128, 48)).toBe(16);
    });
  });

  describe('even and odd combinations', () => {
    it('should handle even and odd numbers', () => {
      expect(gcd(12, 15)).toBe(3);
      expect(gcd(20, 7)).toBe(1);
      expect(gcd(36, 24)).toBe(12);
    });
  });
});
