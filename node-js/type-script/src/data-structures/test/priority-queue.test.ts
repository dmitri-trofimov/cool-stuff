import PriorityQueue from '../priority-queue';

describe('PriorityQueue', () => {
  it('should insert elements and peek at the max element', () => {
    const pq = new PriorityQueue<string>();
    pq.insert('a', 1);
    pq.insert('b', 2);
    pq.insert('c', 0);
    expect(pq.peek()).toBe('b');
  });

  it('should extract the max element correctly', () => {
    const pq = new PriorityQueue<string>();
    pq.insert('a', 1);
    pq.insert('b', 2);
    pq.insert('c', 3);
    expect(pq.extractMax()).toBe('c');
    expect(pq.peek()).toBe('b');
    expect(pq.extractMax()).toBe('b');
    expect(pq.peek()).toBe('a');
  });

  it('should handle different data types', () => {
    const pq = new PriorityQueue<number>();
    pq.insert(10, 10);
    pq.insert(20, 20);
    pq.insert(5, 5);
    expect(pq.peek()).toBe(20);
  });

  it('should return correct size and isEmpty status', () => {
    const pq = new PriorityQueue<string>();
    expect(pq.isEmpty()).toBe(true);
    pq.insert('a', 1);
    expect(pq.isEmpty()).toBe(false);
    expect(pq.size()).toBe(1);
    pq.insert('b', 2);
    expect(pq.size()).toBe(2);
    pq.extractMax();
    expect(pq.size()).toBe(1);
  });

  it('should return null when peeking or extracting from an empty queue', () => {
    const pq = new PriorityQueue<any>();
    expect(pq.peek()).toBeNull();
    expect(pq.extractMax()).toBeNull();
  });

  it('should handle a larger number of elements', () => {
    const pq = new PriorityQueue<number>();
    const elements = Array.from({ length: 100 }, (_, i) => i);
    elements.forEach((el) => pq.insert(el, el));

    expect(pq.peek()).toBe(99);
    expect(pq.extractMax()).toBe(99);
    expect(pq.peek()).toBe(98);
  });

  it('should handle items with the same priority (FIFO is not guaranteed, but should be stable)', () => {
    const pq = new PriorityQueue<string>();
    pq.insert('a', 1);
    pq.insert('b', 2);
    pq.insert('c', 2);
    pq.insert('d', 3);

    expect(pq.extractMax()).toBe('d');
    const maxes = new Set([pq.extractMax(), pq.extractMax()]);
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
    expect(pq.extractMax()).toBe('b');
    expect(pq.peek()).toBe('c');
  });
});
