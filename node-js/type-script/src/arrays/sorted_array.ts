export type Comparator<T> = (a: T, b: T) => number;

const defaultComparator: Comparator<any> = (a, b) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
};

export class SortedArray<T = number> implements Iterable<T> {
  private readonly array: T[] = [];
  private readonly comparator: Comparator<T>;

  constructor(comparator: Comparator<T> = defaultComparator, initialValues?: T[]) {
    this.comparator = comparator;

    if (initialValues) {
      this.array = initialValues.slice().sort(this.comparator);
    }
  }

  private findInsertionIndex(element: T): number {
    let low = 0;
    let high = this.array.length;

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      const comparison = this.comparator(this.array[mid], element);

      if (comparison < 0) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    return low;
  }

  insert(element: T): void {
    const index = this.findInsertionIndex(element);
    this.array.splice(index, 0, element);
  }

  indexOf(element: T): number {
    let low = 0;
    let high = this.array.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const comparison = this.comparator(this.array[mid], element);

      if (comparison === 0) {
        let firstIndex = mid;

        while (firstIndex > 0 && this.comparator(this.array[firstIndex - 1], element) === 0) {
          firstIndex--;
        }

        return firstIndex;
      }

      if (comparison < 0) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return -1;
  }

  remove(element: T): boolean {
    const index = this.indexOf(element);

    if (index !== -1) {
      this.array.splice(index, 1);
      return true;
    }

    return false;
  }

  removeAtIndex(index: number): T | undefined {
    if (index >= 0 && index < this.array.length) {
      return this.array.splice(index, 1)[0];
    }

    return undefined;
  }

  get(index: number): T | undefined {
    return this.array[index];
  }

  get length(): number {
    return this.array.length;
  }

  toArray(): T[] {
    return this.array.slice();
  }

  [Symbol.iterator](): Iterator<T> {
    return this.array[Symbol.iterator]();
  }
}
