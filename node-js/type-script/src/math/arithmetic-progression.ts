/**
 * Calculates the sum of the first N members of an arithmetic progression.
 *
 * @param firstTerm - The first term of the progression.
 * @param difference - The common difference between consecutive terms.
 * @param numberOfTerms - The number of terms to sum.
 * @returns The sum of the first N terms.
 */
export function calculateArithmeticProgressionSum(
  firstTerm: number,
  difference: number,
  numberOfTerms: number
): number {
  return (numberOfTerms / 2) * (2 * firstTerm + (numberOfTerms - 1) * difference);
}
