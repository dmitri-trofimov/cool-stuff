/**
 * A generic PriorityQueue implementation using a binary heap.
 * Elements with higher priority values are considered higher priority.
 */
export default class PriorityQueue<T> {
  private heap: { value: T; priority: number }[] = [];

  constructor(initialItems?: { value: T; priority: number }[]) {
    if (initialItems) {
      this.heap = [...initialItems];
      for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
        this.siftDown(i);
      }
    }
  }

  public insert(value: T, priority: number): void {
    this.heap.push({ value, priority });
    this.siftUp(this.heap.length - 1);
  }

  public peek(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.heap[0].value;
  }

  public extractMax(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    this.swap(0, this.heap.length - 1);
    const max = this.heap.pop();
    if (!this.isEmpty()) {
      this.siftDown(0);
    }
    return max ? max.value : null;
  }

  public size(): number {
    return this.heap.length;
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  private siftUp(index: number): void {
    let parentIndex = this.parent(index);
    while (index > 0 && this.heap[parentIndex].priority < this.heap[index].priority) {
      this.swap(parentIndex, index);
      index = parentIndex;
      parentIndex = this.parent(index);
    }
  }

  private siftDown(index: number): void {
    let maxIndex = index;
    const leftIndex = this.leftChild(index);
    const rightIndex = this.rightChild(index);
    const size = this.size();

    if (leftIndex < size && this.heap[leftIndex].priority > this.heap[maxIndex].priority) {
      maxIndex = leftIndex;
    }

    if (rightIndex < size && this.heap[rightIndex].priority > this.heap[maxIndex].priority) {
      maxIndex = rightIndex;
    }

    if (index !== maxIndex) {
      this.swap(index, maxIndex);
      this.siftDown(maxIndex);
    }
  }

  private parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private leftChild(index: number): number {
    return 2 * index + 1;
  }

  private rightChild(index: number): number {
    return 2 * index + 2;
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}
