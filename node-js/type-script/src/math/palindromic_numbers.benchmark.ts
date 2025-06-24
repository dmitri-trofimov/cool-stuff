import { generatePalindromicNumbers, generatePalindromicNumbers2 } from './palindromic_numbers';

const NUM_PALINDROMES = 999999999;

function runBenchmark(generatorFn: (base?: number) => Generator<number>, name: string) {
  console.log(`Starting benchmark for ${name}...`);
  console.time(name);
  const generator = generatorFn();
  for (let i = 0; i < NUM_PALINDROMES; i++) {
    generator.next();
  }
  console.timeEnd(name);
}

console.log(`Benchmarking generation of ${NUM_PALINDROMES} palindromic numbers...`);

runBenchmark(generatePalindromicNumbers, 'generatePalindromicNumbers (string-based)');
runBenchmark(generatePalindromicNumbers2, 'generatePalindromicNumbers2 (arithmetic-based)');
