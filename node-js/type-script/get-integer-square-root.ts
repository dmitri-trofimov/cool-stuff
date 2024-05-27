export function getIntegerSquareRoot(n: number): number {
    if (n < 0) {
        return NaN;
    }

    if (n <= 1) {
        return n;
    }

    n >>>= 0;

    let a = n >>> 1;
    let b = (a + ((n / a) >>> 0)) >>> 1;

    while (b < a) {
        a = b;
        b = (a + ((n / a) >>> 0)) >>> 1;
    }

    return a;
}
