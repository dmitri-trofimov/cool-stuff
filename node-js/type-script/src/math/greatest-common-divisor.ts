/**
 * Computes the Greatest Common Divisor (GCD) of two integers using the Binary GCD algorithm (Stein's algorithm).
 * Time Complexity: O(log(min(a, b)))
 * Space Complexity: O(1)
 * @param a - First integer
 * @param b - Second integer
 * @returns The greatest common divisor of a and b
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);

  if (a === 0) return b;
  if (b === 0) return a;

  let commonFactor = 0;

  while (((a | b) & 1) === 0) {
    commonFactor++;
    a >>= 1;
    b >>= 1;
  }

  while ((a & 1) === 0) {
    a >>= 1;
  }

  while (b !== 0) {
    while ((b & 1) === 0) {
      b >>= 1;
    }

    if (a > b) {
      [a, b] = [b, a];
    }

    b -= a;
  }

  return a << commonFactor;
}
