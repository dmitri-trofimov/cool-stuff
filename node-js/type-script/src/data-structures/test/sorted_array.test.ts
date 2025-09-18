import { SortedArray, Comparator } from '../sorted_array';

describe('SortedArray', () => {
  describe('constructor', () => {
    it('should create an empty array when no initial values are provided', () => {
      const sortedArray = new SortedArray();

      expect(sortedArray.length).toBe(0);
      expect(sortedArray.toArray()).toEqual([]);
    });

    it('should create a sorted array from initial values with default comparator', () => {
      const initialValues = [5, 2, 8, 1, 9];

      const sortedArray = new SortedArray(undefined, ...initialValues);

      expect(sortedArray.toArray()).toEqual([1, 2, 5, 8, 9]);
    });

    it('should create a sorted array from initial values with a custom comparator', () => {
      const initialValues = [{ val: 5 }, { val: 2 }, { val: 8 }];
      const comparator: Comparator<{ val: number }> = (a, b) => b.val - a.val;

      const sortedArray = new SortedArray(comparator, ...initialValues);

      expect(sortedArray.toArray()).toEqual([{ val: 8 }, { val: 5 }, { val: 2 }]);
    });
  });

  describe('insert', () => {
    it('should insert elements in the correct order (numbers)', () => {
      const sortedArray = new SortedArray();

      sortedArray.insert(5);
      sortedArray.insert(2);
      sortedArray.insert(8);
      sortedArray.insert(1);
      sortedArray.insert(9);
      sortedArray.insert(5); // duplicate

      expect(sortedArray.toArray()).toEqual([1, 2, 5, 5, 8, 9]);
    });

    it('should insert elements in the correct order (objects)', () => {
      const comparator: Comparator<{ val: number }> = (a, b) => a.val - b.val;
      const sortedArray = new SortedArray(comparator);
      sortedArray.insert({ val: 5 });
      sortedArray.insert({ val: 2 });
      sortedArray.insert({ val: 8 });

      expect(sortedArray.toArray()).toEqual([{ val: 2 }, { val: 5 }, { val: 8 }]);
    });
  });

  describe('indexOf', () => {
    it('should return the correct index of an element', () => {
      const sortedArray = new SortedArray<number>(undefined, ...[1, 2, 5, 5, 8, 9]);

      expect(sortedArray.indexOf(5)).toBe(2);
      expect(sortedArray.indexOf(1)).toBe(0);
      expect(sortedArray.indexOf(9)).toBe(5);
    });

    it('should return -1 for an element not in the array', () => {
      const sortedArray = new SortedArray<number>(undefined, ...[1, 2, 5, 8, 9]);
      expect(sortedArray.indexOf(7)).toBe(-1);
    });

    it('should return the first index of a duplicated element', () => {
      const sortedArray = new SortedArray<number>(undefined, ...[1, 2, 5, 5, 5, 8, 9]);
      expect(sortedArray.indexOf(5)).toBe(2);
    });
  });

  describe('remove', () => {
    it('should remove an element from the array', () => {
      const sortedArray = new SortedArray<number>(undefined, ...[1, 2, 5, 8, 9]);
      const result = sortedArray.remove(5);
      expect(result).toBe(true);
      expect(sortedArray.toArray()).toEqual([1, 2, 8, 9]);
    });

    it('should return false if the element to remove is not found', () => {
      const sortedArray = new SortedArray<number>(undefined, ...[1, 2, 8, 9]);
      const result = sortedArray.remove(5);
      expect(result).toBe(false);
      expect(sortedArray.toArray()).toEqual([1, 2, 8, 9]);
    });

    it('should remove only the first occurrence of a duplicated element', () => {
      const sortedArray = new SortedArray<number>(undefined, ...[1, 2, 5, 5, 8, 9]);
      sortedArray.remove(5);
      expect(sortedArray.toArray()).toEqual([1, 2, 5, 8, 9]);
    });
  });

  describe('removeAtIndex', () => {
    it('should remove the element at the specified index', () => {
      const sortedArray = new SortedArray<number>(undefined, ...[1, 2, 5, 8, 9]);
      const removed = sortedArray.removeAtIndex(2);
      expect(removed).toBe(5);
      expect(sortedArray.toArray()).toEqual([1, 2, 8, 9]);
    });

    it('should return undefined for an invalid index', () => {
      const sortedArray = new SortedArray<number>(undefined, ...[1, 2, 5, 8, 9]);
      const removed = sortedArray.removeAtIndex(10);
      expect(removed).toBeUndefined();
      expect(sortedArray.toArray()).toEqual([1, 2, 5, 8, 9]);
    });
  });

  describe('utility methods', () => {
    it('get() should return the element at the specified index', () => {
      const sortedArray = new SortedArray<number>(undefined, ...[1, 2, 5, 8, 9]);
      expect(sortedArray.get(2)).toBe(5);
      expect(sortedArray.get(10)).toBeUndefined();
    });

    it('length should return the number of elements', () => {
      const sortedArray = new SortedArray<number>(undefined, ...[1, 2, 5, 8, 9]);
      expect(sortedArray.length).toBe(5);
      sortedArray.insert(10);
      expect(sortedArray.length).toBe(6);
      sortedArray.removeAtIndex(0);
      expect(sortedArray.length).toBe(5);
    });

    it('should be iterable', () => {
      const initialValues = [5, 2, 8, 1, 9];
      const sortedArray = new SortedArray<number>(undefined, ...initialValues);
      const result = [];
      for (const item of sortedArray) {
        result.push(item);
      }
      expect(result).toEqual([1, 2, 5, 8, 9]);
      expect([...sortedArray]).toEqual([1, 2, 5, 8, 9]);
    });
  });

  describe('leet code problems', () => {
    describe('2353. Design a Food Rating System', () => {
      it('testcase 38', () => {
        type Food = {
          name: string;
          rating: number;
        };

        const foodComparator: Comparator<Food> = (a, b) => b.rating - a.rating || a.name.localeCompare(b.name);

        const apple = { name: 'apple', rating: 11 }; // czopaaeyl
        const banana = { name: 'banana', rating: 2 }; // lxoozsbh
        const cherry = { name: 'cherry', rating: 15 }; // kbaxapl

        const sortedArray = new SortedArray(foodComparator, apple, banana, cherry);

        sortedArray.remove(apple);
        apple.rating = 12;
        sortedArray.insert(apple);
        expect(sortedArray.get(0)).toEqual(cherry);

        sortedArray.remove(cherry);
        cherry.rating = 8;
        sortedArray.insert(cherry);
        expect(sortedArray.get(0)).toEqual(apple);

        sortedArray.remove(banana);
        banana.rating = 5;
        sortedArray.insert(banana);
        expect(sortedArray.get(0)).toEqual(apple);
      });
    });
  });
});
