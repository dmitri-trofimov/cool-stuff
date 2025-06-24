import { generatePalindromicNumbers } from '../palindromic_numbers';

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
    expect(generator.next().value).toBe(22);
    expect(generator.next().value).toBe(33);
    expect(generator.next().value).toBe(44);
    expect(generator.next().value).toBe(55);
    expect(generator.next().value).toBe(66);
    expect(generator.next().value).toBe(77);
    expect(generator.next().value).toBe(88);
    expect(generator.next().value).toBe(99);
    expect(generator.next().value).toBe(101);
    expect(generator.next().value).toBe(111);
    expect(generator.next().value).toBe(121);
    expect(generator.next().value).toBe(131);
    expect(generator.next().value).toBe(141);
    expect(generator.next().value).toBe(151);
    expect(generator.next().value).toBe(161);
    expect(generator.next().value).toBe(171);
    expect(generator.next().value).toBe(181);
    expect(generator.next().value).toBe(191);

    for (let i = 0; i < 10000; i++) {
      generator.next();
    }

    expect(generator.next().value).toBe(9030309);
    expect(generator.next().value).toBe(9031309);
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
