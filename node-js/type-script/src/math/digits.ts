export function getDigits(num: number): number[] {
  if (!Number.isInteger(num)) {
    throw new Error('Input must be an integer.');
  }

  if (num < 0) {
    throw new Error('Input must be a non-negative integer.');
  }

  if (num === 0) {
    return [0];
  }

  const digits: number[] = [];

  let n = num;

  while (n > 0) {
    const q = Math.floor(n / 10);
    const r = n - q * 10;
    digits.push(r);
    n = q;
  }

  return digits.reverse();
}
