export function* generatePalindromicNumbers(base = 10) {
  if (base < 2 || !Number.isInteger(base)) {
    throw new Error('Base must be an integer greater than or equal to 2.');
  }

  let n = 0;
  while (true) {
    if (isPalindrome(n, base)) {
      yield n;
    }
    n++;
  }
}

function isPalindrome(n: number, base: number): boolean {
  if (n < 0) {
    return false;
  }

  let reversed = 0;
  let original = n;

  while (n > 0) {
    reversed = reversed * base + (n % base);
    n = Math.floor(n / base);
  }

  return original === reversed;
}
