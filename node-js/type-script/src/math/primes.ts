/**
 * Checks if a number is a prime number.
 *
 * Works correctly for integers up to Number.MAX_SAFE_INTEGER (2^53 - 1).
 * Returns false for non-integers, numbers <= 1, and unsafe integers.
 */
export function isPrime(n: number): boolean {
  // Check if n is an integer and within the safe integer range
  if (!Number.isInteger(n) || !Number.isSafeInteger(n)) {
    return false;
  }

  // Handle small numbers
  if (n <= 1) return false;
  if (n <= 3) return true;

  // Check divisibility by 2 and 3
  if (n % 2 === 0 || n % 3 === 0) return false;

  // Check divisibility by numbers of form 6k ± 1 up to sqrt(n)
  // We strictly check i <= limit because for perfect squares of primes (e.g. 25),
  // we need to check 5.
  const limit = Math.sqrt(n);

  for (let i = 5; i <= limit; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
}
