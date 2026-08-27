import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import PriorityQueue from '../priority-queue.ts';

describe('PriorityQueue', () => {
  it('should enqueue elements and peek at the max element', () => {
    const pq = new PriorityQueue<string>();
    pq.enqueue('a', 1);
    pq.enqueue('b', 2);
    pq.enqueue('c', 0);
    assert.strictEqual(pq.peek(), 'b');
  });

  it('should dequeue the max element correctly', () => {
    const pq = new PriorityQueue<string>();
    pq.enqueue('a', 1);
    pq.enqueue('b', 2);
    pq.enqueue('c', 3);
    assert.strictEqual(pq.dequeue(), 'c');
    assert.strictEqual(pq.peek(), 'b');
    assert.strictEqual(pq.dequeue(), 'b');
    assert.strictEqual(pq.peek(), 'a');
  });

  it('should handle different data types', () => {
    const pq = new PriorityQueue<number>();
    pq.enqueue(10, 10);
    pq.enqueue(20, 20);
    pq.enqueue(5, 5);
    assert.strictEqual(pq.peek(), 20);
  });

  it('should return correct size and isEmpty status', () => {
    const pq = new PriorityQueue<string>();
    assert.strictEqual(pq.isEmpty(), true);
    pq.enqueue('a', 1);
    assert.strictEqual(pq.isEmpty(), false);
    assert.strictEqual(pq.size(), 1);
    pq.enqueue('b', 2);
    assert.strictEqual(pq.size(), 2);
    pq.dequeue();
    assert.strictEqual(pq.size(), 1);
  });

  it('should return null when peeking or dequeuing from an empty queue', () => {
    const pq = new PriorityQueue<any>();
    assert.strictEqual(pq.peek(), null);
    assert.strictEqual(pq.dequeue(), null);
  });

  it('should handle a larger number of elements', () => {
    const pq = new PriorityQueue<number>();
    const elements = Array.from({ length: 100 }, (_, i) => i);
    elements.forEach((el) => pq.enqueue(el, el));

    assert.strictEqual(pq.peek(), 99);
    assert.strictEqual(pq.dequeue(), 99);
    assert.strictEqual(pq.peek(), 98);
  });

  it('should handle items with the same priority (FIFO is not guaranteed, but should be stable)', () => {
    const pq = new PriorityQueue<string>();
    pq.enqueue('a', 1);
    pq.enqueue('b', 2);
    pq.enqueue('c', 2);
    pq.enqueue('d', 3);

    assert.strictEqual(pq.dequeue(), 'd');
    const maxes = new Set([pq.dequeue(), pq.dequeue()]);
    assert.strictEqual(maxes.has('b'), true);
    assert.strictEqual(maxes.has('c'), true);
    assert.strictEqual(pq.peek(), 'a');
  });

  it('should correctly initialize with an array of items', () => {
    const items = [
      { value: 'a', priority: 1 },
      { value: 'b', priority: 3 },
      { value: 'c', priority: 2 },
    ];
    const pq = new PriorityQueue<string>(items);
    assert.strictEqual(pq.size(), 3);
    assert.strictEqual(pq.peek(), 'b');
    assert.strictEqual(pq.dequeue(), 'b');
    assert.strictEqual(pq.peek(), 'c');
  });

  it('should throw an error when enqueuing a duplicate value', () => {
    const pq = new PriorityQueue<string>();
    pq.enqueue('a', 1);
    assert.throws(() => pq.enqueue('a', 2), { message: 'Value already exists in the priority queue.' });
  });

  describe('changePriority', () => {
    it('should increase the priority of an element', () => {
      const pq = new PriorityQueue<string>();
      pq.enqueue('a', 1);
      pq.enqueue('b', 2);
      pq.enqueue('c', 3);

      pq.changePriority('a', 4);
      assert.strictEqual(pq.peek(), 'a');
      assert.strictEqual(pq.dequeue(), 'a');
      assert.strictEqual(pq.peek(), 'c');
    });

    it('should decrease the priority of an element', () => {
      const pq = new PriorityQueue<string>();
      pq.enqueue('a', 1);
      pq.enqueue('b', 4);
      pq.enqueue('c', 3);

      pq.changePriority('b', 2);
      assert.strictEqual(pq.peek(), 'c');
      assert.strictEqual(pq.dequeue(), 'c');
      assert.strictEqual(pq.peek(), 'b');
    });

    it('should throw an error if the value does not exist', () => {
      const pq = new PriorityQueue<string>();
      pq.enqueue('a', 1);
      assert.throws(() => pq.changePriority('b', 2), { message: 'Value not found in the priority queue.' });
    });
  });

  describe('remove', () => {
    it('should remove an element from the queue', () => {
      const pq = new PriorityQueue<string>();
      pq.enqueue('a', 1);
      pq.enqueue('b', 2);
      pq.enqueue('c', 3);

      pq.remove('b');
      assert.strictEqual(pq.size(), 2);
      assert.strictEqual(pq.peek(), 'c');
      assert.strictEqual(pq.dequeue(), 'c');
      assert.strictEqual(pq.peek(), 'a');
    });

    it('should remove the max element', () => {
      const pq = new PriorityQueue<string>();
      pq.enqueue('a', 1);
      pq.enqueue('b', 3);
      pq.enqueue('c', 2);

      pq.remove('b');
      assert.strictEqual(pq.size(), 2);
      assert.strictEqual(pq.peek(), 'c');
    });

    it('should remove the last element', () => {
      const pq = new PriorityQueue<string>();
      pq.enqueue('a', 3);
      pq.enqueue('b', 2);
      pq.enqueue('c', 1);

      pq.remove('c');
      assert.strictEqual(pq.size(), 2);
      assert.strictEqual(pq.peek(), 'a');
    });

    it('should throw an error if the value does not exist', () => {
      const pq = new PriorityQueue<string>();
      pq.enqueue('a', 1);
      assert.throws(() => pq.remove('b'), { message: 'Value not found in the priority queue.' });
    });
  });
});
