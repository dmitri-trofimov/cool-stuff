export function* generatePalindromicNumbers(base = 10) {
  if (base < 2 || !Number.isInteger(base)) {
    throw new Error('Base must be an integer greater than or equal to 2.');
  }

  yield 0;

  for (let length = 1; ; length++) {
    const halfLength = Math.ceil(length / 2);
    const firstHalfStart = halfLength === 1 ? 1 : base ** (halfLength - 1);
    const firstHalfEnd = base ** halfLength;

    for (let firstHalf = firstHalfStart; firstHalf < firstHalfEnd; firstHalf++) {
      let palindrome = firstHalf;
      let temp = firstHalf;

      if (length % 2 === 1) {
        temp = Math.floor(temp / base);
      }

      while (temp > 0) {
        const digit = temp % base;
        palindrome = palindrome * base + digit;
        temp = Math.floor(temp / base);
      }
      yield palindrome;
    }
  }
}

export function* generatePalindromicNumbers2(base = 10) {
  if (base < 2 || !Number.isInteger(base)) {
    throw new Error('Base must be an integer greater than or equal to 2.');
  }

  yield 0;

  const digits = [0];

  let isOddLength = true;

  while (true) {
    // increment
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

    // reconstruct palindrome
    let palindrome = 0;

    for (let i = 0; i < digits.length; i++) {
      palindrome = palindrome * base + digits[i];
    }

    for (let i = digits.length - (isOddLength ? 1 : 2); i >= 0; i--) {
      palindrome = palindrome * base + digits[i];
    }

    yield palindrome;
  }
}
