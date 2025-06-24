export function* generatePalindromicNumbers(base = 10) {
  if (base < 2 || !Number.isInteger(base)) {
    throw new Error('Base must be an integer greater than or equal to 2.');
  }

  yield 0;

  for (let length = 1; ; length++) {
    const halfLength = Math.ceil(length / 2);
    const firstHalfStart = base ** (halfLength - 1);
    const firstHalfEnd = base ** halfLength;

    for (let i = firstHalfStart; i < firstHalfEnd; i++) {
      const firstHalfStr = i.toString(base);
      let secondHalfStr = [...firstHalfStr].reverse().join('');

      if (length % 2 === 1) {
        secondHalfStr = secondHalfStr.substring(1);
      }

      const palindromeStr = firstHalfStr + secondHalfStr;
      yield parseInt(palindromeStr, base);
    }
  }
}
