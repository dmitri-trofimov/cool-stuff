/**
 * Checks if a number is a prime number.
 *
 * Works correctly for integers up to Number.MAX_SAFE_INTEGER (2^53 - 1).
 * Returns false for non-integers, numbers <= 1, and unsafe integers.
 *
 * Uses Miller-Rabin primality test for larger numbers to ensure efficiency.
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

  if (n < 1000) {
    const limit = Math.sqrt(n);

    for (let i = 5; i <= limit; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) {
        return false;
      }
    }

    return true;
  }

  return millerRabinTest(n);
}

// Bases for deterministic Miller-Rabin for n < 3,317,044,064,279,371 (covers MAX_SAFE_INTEGER)
// For n < 2^64, the first 12 primes are sufficient.
const MR_BASES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];

function millerRabinTest(n: number): boolean {
  const nBig = BigInt(n);
  const one = BigInt(1);
  const nMinusOne = nBig - one;

  // Find d and s such that n - 1 = d * 2^s
  let d = nMinusOne;
  let s = 0;

  while (d % 2n === 0n) {
    d /= 2n;
    s++;
  }

  for (const base of MR_BASES) {
    const a = BigInt(base);
    let x = modPow(a, d, nBig);

    if (x === one || x === nMinusOne) continue;

    let composite = true;

    for (let r = 1; r < s; r++) {
      x = (x * x) % nBig;

      if (x === nMinusOne) {
        composite = false;
        break;
      }
    }

    if (composite) {
      return false;
    }
  }

  return true;
}

function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n;
  let b = base % mod;
  let e = exp;

  while (e > 0n) {
    if (e % 2n === 1n) {
      result = (result * b) % mod;
    }

    b = (b * b) % mod;
    e /= 2n;
  }

  return result;
}
