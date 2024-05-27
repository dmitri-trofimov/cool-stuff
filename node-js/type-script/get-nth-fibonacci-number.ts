export function getNthFibonacciNumber(n: number): number {
    if (n < 0) {
		throw RangeError("Negative arguments not implemented");
    }

    return getNthFibonacciTuppleRecursive(n)[0];
}

function getNthFibonacciTuppleRecursive(n: number): number[] {
	if (n == 0) {
        return [0, 1];
    }
		
	const [a, b] = getNthFibonacciTuppleRecursive(n >>> 1);
    const c = a * ((b << 1) - a);
	const d = a * a + b * b;

    if ((n & 1) === 0) {
        return [c, d];
    }
        
	return [d, c + d];
}
