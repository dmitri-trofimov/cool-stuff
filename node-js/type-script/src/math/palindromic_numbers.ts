export function* generatePalindromicNumbers(base = 10): Generator<number> {
  if (base < 2 || !Number.isInteger(base)) {
    throw new Error('Base must be an integer greater than or equal to 2.');
  }

  yield 0;

  const digits = [0];

  let isOddLength = true;

  while (true) {
    let carry = 1;

    for (let i = 0; i < digits.length; i++) {
      if (carry === 0) {
        break;
      }

      let digit = digits[i] + carry;
      carry = 0;

      if (digit === base) {
        carry = 1;
        digit = 0;
      }

      digits[i] = digit;
    }

    if (carry === 1) {
      if (isOddLength) {
        digits[digits.length - 1] = 1;
      } else {
        digits.push(1);
      }

      isOddLength = !isOddLength;
    }

    let palindrome = 0;

    for (let i = digits.length - 1; i >= 0; i--) {
      palindrome = palindrome * base + digits[i];
    }

    for (let i = isOddLength ? 1 : 0; i < digits.length; i++) {
      palindrome = palindrome * base + digits[i];
    }

    yield palindrome;
  }
}
