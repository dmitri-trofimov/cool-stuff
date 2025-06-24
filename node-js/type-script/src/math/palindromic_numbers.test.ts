import { generatePalindromicNumbers } from './palindromic_numbers';

describe('generatePalindromicNumbers', () => {
  it('should generate palindromic numbers in base 10', () => {
    const generator = generatePalindromicNumbers();
    expect(generator.next().value).toBe(0);
    expect(generator.next().value).toBe(1);
    expect(generator.next().value).toBe(2);
    expect(generator.next().value).toBe(3);
    expect(generator.next().value).toBe(4);
    expect(generator.next().value).toBe(5);
    expect(generator.next().value).toBe(6);
    expect(generator.next().value).toBe(7);
    expect(generator.next().value).toBe(8);
    expect(generator.next().value).toBe(9);
    expect(generator.next().value).toBe(11);
  });

  it('should generate palindromic numbers in base 2', () => {
    const generator = generatePalindromicNumbers(2);
    expect(generator.next().value).toBe(0); // 0
    expect(generator.next().value).toBe(1); // 1
    expect(generator.next().value).toBe(3); // 11
    expect(generator.next().value).toBe(5); // 101
    expect(generator.next().value).toBe(7); // 111
    expect(generator.next().value).toBe(9); // 1001
    expect(generator.next().value).toBe(15); // 1111
  });

  it('should throw an error for invalid base', () => {
    expect(() => generatePalindromicNumbers(1).next()).toThrow('Base must be an integer greater than or equal to 2.');
    expect(() => generatePalindromicNumbers(1.5).next()).toThrow('Base must be an integer greater than or equal to 2.');
  });
});
