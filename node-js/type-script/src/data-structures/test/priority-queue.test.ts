import PriorityQueue from '../priority-queue';

describe('PriorityQueue', () => {
  it('should enqueue elements and peek at the max element', () => {
    const pq = new PriorityQueue<string>();
    pq.enqueue('a', 1);
    pq.enqueue('b', 2);
    pq.enqueue('c', 0);
    expect(pq.peek()).toBe('b');
  });

  it('should dequeue the max element correctly', () => {
    const pq = new PriorityQueue<string>();
    pq.enqueue('a', 1);
    pq.enqueue('b', 2);
    pq.enqueue('c', 3);
    expect(pq.dequeue()).toBe('c');
    expect(pq.peek()).toBe('b');
    expect(pq.dequeue()).toBe('b');
    expect(pq.peek()).toBe('a');
  });

  it('should handle different data types', () => {
    const pq = new PriorityQueue<number>();
    pq.enqueue(10, 10);
    pq.enqueue(20, 20);
    pq.enqueue(5, 5);
    expect(pq.peek()).toBe(20);
  });

  it('should return correct size and isEmpty status', () => {
    const pq = new PriorityQueue<string>();
    expect(pq.isEmpty()).toBe(true);
    pq.enqueue('a', 1);
    expect(pq.isEmpty()).toBe(false);
    expect(pq.size()).toBe(1);
    pq.enqueue('b', 2);
    expect(pq.size()).toBe(2);
    pq.dequeue();
    expect(pq.size()).toBe(1);
  });

  it('should return null when peeking or dequeuing from an empty queue', () => {
    const pq = new PriorityQueue<any>();
    expect(pq.peek()).toBeNull();
    expect(pq.dequeue()).toBeNull();
  });

  it('should handle a larger number of elements', () => {
    const pq = new PriorityQueue<number>();
    const elements = Array.from({ length: 100 }, (_, i) => i);
    elements.forEach((el) => pq.enqueue(el, el));

    expect(pq.peek()).toBe(99);
    expect(pq.dequeue()).toBe(99);
    expect(pq.peek()).toBe(98);
  });

  it('should handle items with the same priority (FIFO is not guaranteed, but should be stable)', () => {
    const pq = new PriorityQueue<string>();
    pq.enqueue('a', 1);
    pq.enqueue('b', 2);
    pq.enqueue('c', 2);
    pq.enqueue('d', 3);

    expect(pq.dequeue()).toBe('d');
    const maxes = new Set([pq.dequeue(), pq.dequeue()]);
    expect(maxes.has('b')).toBe(true);
    expect(maxes.has('c')).toBe(true);
    expect(pq.peek()).toBe('a');
  });

  it('should correctly initialize with an array of items', () => {
    const items = [
      { value: 'a', priority: 1 },
      { value: 'b', priority: 3 },
      { value: 'c', priority: 2 },
    ];
    const pq = new PriorityQueue<string>(items);
    expect(pq.size()).toBe(3);
    expect(pq.peek()).toBe('b');
    expect(pq.dequeue()).toBe('b');
    expect(pq.peek()).toBe('c');
  });

  it('should throw an error when enqueuing a duplicate value', () => {
    const pq = new PriorityQueue<string>();
    pq.enqueue('a', 1);
    expect(() => pq.enqueue('a', 2)).toThrow('Value already exists in the priority queue.');
  });

  describe('changePriority', () => {
    it('should increase the priority of an element', () => {
      const pq = new PriorityQueue<string>();
      pq.enqueue('a', 1);
      pq.enqueue('b', 2);
      pq.enqueue('c', 3);

      pq.changePriority('a', 4);
      expect(pq.peek()).toBe('a');
      expect(pq.dequeue()).toBe('a');
      expect(pq.peek()).toBe('c');
    });

    it('should decrease the priority of an element', () => {
      const pq = new PriorityQueue<string>();
      pq.enqueue('a', 1);
      pq.enqueue('b', 4);
      pq.enqueue('c', 3);

      pq.changePriority('b', 2);
      expect(pq.peek()).toBe('c');
      expect(pq.dequeue()).toBe('c');
      expect(pq.peek()).toBe('b');
    });

    it('should throw an error if the value does not exist', () => {
      const pq = new PriorityQueue<string>();
      pq.enqueue('a', 1);
      expect(() => pq.changePriority('b', 2)).toThrow('Value not found in the priority queue.');
    });
  });

  describe('remove', () => {
    it('should remove an element from the queue', () => {
      const pq = new PriorityQueue<string>();
      pq.enqueue('a', 1);
      pq.enqueue('b', 2);
      pq.enqueue('c', 3);

      pq.remove('b');
      expect(pq.size()).toBe(2);
      expect(pq.peek()).toBe('c');
      expect(pq.dequeue()).toBe('c');
      expect(pq.peek()).toBe('a');
    });

    it('should remove the max element', () => {
      const pq = new PriorityQueue<string>();
      pq.enqueue('a', 1);
      pq.enqueue('b', 3);
      pq.enqueue('c', 2);

      pq.remove('b');
      expect(pq.size()).toBe(2);
      expect(pq.peek()).toBe('c');
    });

    it('should remove the last element', () => {
      const pq = new PriorityQueue<string>();
      pq.enqueue('a', 3);
      pq.enqueue('b', 2);
      pq.enqueue('c', 1);

      pq.remove('c');
      expect(pq.size()).toBe(2);
      expect(pq.peek()).toBe('a');
    });

    it('should throw an error if the value does not exist', () => {
      const pq = new PriorityQueue<string>();
      pq.enqueue('a', 1);
      expect(() => pq.remove('b')).toThrow('Value not found in the priority queue.');
    });
  });
});
