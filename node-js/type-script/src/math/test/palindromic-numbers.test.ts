import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import { generatePalindromicNumbers } from '../palindromic-numbers.ts';

describe('generatePalindromicNumbers', () => {
  it('should generate palindromic numbers in base 10', () => {
    const generator = generatePalindromicNumbers();

    assert.strictEqual(generator.next().value, 0);
    assert.strictEqual(generator.next().value, 1);
    assert.strictEqual(generator.next().value, 2);
    assert.strictEqual(generator.next().value, 3);
    assert.strictEqual(generator.next().value, 4);
    assert.strictEqual(generator.next().value, 5);
    assert.strictEqual(generator.next().value, 6);
    assert.strictEqual(generator.next().value, 7);
    assert.strictEqual(generator.next().value, 8);
    assert.strictEqual(generator.next().value, 9);
    assert.strictEqual(generator.next().value, 11);
    assert.strictEqual(generator.next().value, 22);
    assert.strictEqual(generator.next().value, 33);
    assert.strictEqual(generator.next().value, 44);
    assert.strictEqual(generator.next().value, 55);
    assert.strictEqual(generator.next().value, 66);
    assert.strictEqual(generator.next().value, 77);
    assert.strictEqual(generator.next().value, 88);
    assert.strictEqual(generator.next().value, 99);
    assert.strictEqual(generator.next().value, 101);
    assert.strictEqual(generator.next().value, 111);
    assert.strictEqual(generator.next().value, 121);
    assert.strictEqual(generator.next().value, 131);
    assert.strictEqual(generator.next().value, 141);
    assert.strictEqual(generator.next().value, 151);
    assert.strictEqual(generator.next().value, 161);
    assert.strictEqual(generator.next().value, 171);
    assert.strictEqual(generator.next().value, 181);
    assert.strictEqual(generator.next().value, 191);

    for (let i = 0; i < 10000; i++) {
      generator.next();
    }

    assert.strictEqual(generator.next().value, 9030309);
    assert.strictEqual(generator.next().value, 9031309);
  });

  it('should generate palindromic numbers in base 2', () => {
    const generator = generatePalindromicNumbers(2);
    assert.strictEqual(generator.next().value, 0); // 0
    assert.strictEqual(generator.next().value, 1); // 1
    assert.strictEqual(generator.next().value, 3); // 11
    assert.strictEqual(generator.next().value, 5); // 101
    assert.strictEqual(generator.next().value, 7); // 111
    assert.strictEqual(generator.next().value, 9); // 1001
    assert.strictEqual(generator.next().value, 15); // 1111
  });

  it('should throw an error for invalid base', () => {
    assert.throws(() => generatePalindromicNumbers(1).next(), { message: 'Base must be an integer greater than or equal to 2.' });
    assert.throws(() => generatePalindromicNumbers(1.5).next(), { message: 'Base must be an integer greater than or equal to 2.' });
  });
});
