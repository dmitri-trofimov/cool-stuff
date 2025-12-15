import { calculateArithmeticProgressionSum } from '../arithmetic-progression';

describe('calculateArithmeticProgressionSum', () => {
  it('should calculate the sum correctly for a basic progression', () => {
    // 2, 5, 8, 11, 14 -> Sum = 40
    // firstTerm=2, difference=3, numberOfTerms=5
    expect(calculateArithmeticProgressionSum(2, 3, 5)).toBe(40);
  });

  it('should return the first term when number of terms is 1', () => {
    // firstTerm=10, difference=5, numberOfTerms=1
    expect(calculateArithmeticProgressionSum(10, 5, 1)).toBe(10);
  });

  it('should return 0 when number of terms is 0', () => {
    // firstTerm=10, difference=5, numberOfTerms=0
    expect(calculateArithmeticProgressionSum(10, 5, 0)).toBe(0);
  });

  it('should handle negative difference correctly', () => {
    // 5, 3, 1 -> Sum = 9
    // firstTerm=5, difference=-2, numberOfTerms=3
    expect(calculateArithmeticProgressionSum(5, -2, 3)).toBe(9);
  });

  it('should handle negative first term correctly', () => {
    // -5, -3, -1 -> Sum = -9
    // firstTerm=-5, difference=2, numberOfTerms=3
    expect(calculateArithmeticProgressionSum(-5, 2, 3)).toBe(-9);
  });

  it('should handle zero difference', () => {
    // 4, 4, 4 -> Sum = 12
    // firstTerm=4, difference=0, numberOfTerms=3
    expect(calculateArithmeticProgressionSum(4, 0, 3)).toBe(12);
  });
});
