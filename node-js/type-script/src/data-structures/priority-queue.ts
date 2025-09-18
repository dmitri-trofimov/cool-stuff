export default class PriorityQueue<T> {
  private heap: { value: T; priority: number }[] = [];
  private valueIndices: Map<T, number> = new Map();

  constructor(initialItems?: { value: T; priority: number }[]) {
    if (initialItems) {
      this.heap = [...initialItems];
      for (let i = 0; i < this.heap.length; i++) {
        this.valueIndices.set(this.heap[i].value, i);
      }
      for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
        this.siftDown(i);
      }
    }
  }

  public enqueue(value: T, priority: number): void {
    if (this.valueIndices.has(value)) {
      throw new Error('Value already exists in the priority queue.');
    }
    this.heap.push({ value, priority });
    const index = this.heap.length - 1;
    this.valueIndices.set(value, index);
    this.siftUp(index);
  }

  public peek(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.heap[0].value;
  }

  public dequeue(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    this.swap(0, this.heap.length - 1);
    const max = this.heap.pop();
    if (max) {
      this.valueIndices.delete(max.value);
    }
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

  public changePriority(value: T, newPriority: number): void {
    if (!this.valueIndices.has(value)) {
      throw new Error('Value not found in the priority queue.');
    }
    const index = this.valueIndices.get(value)!;
    const oldPriority = this.heap[index].priority;
    this.heap[index].priority = newPriority;

    if (newPriority > oldPriority) {
      this.siftUp(index);
    } else {
      this.siftDown(index);
    }
  }

  public remove(value: T): void {
    if (!this.valueIndices.has(value)) {
      throw new Error('Value not found in the priority queue.');
    }

    const index = this.valueIndices.get(value)!;
    const lastIndex = this.heap.length - 1;

    if (index === lastIndex) {
      this.heap.pop();
      this.valueIndices.delete(value);
      return;
    }

    this.swap(index, lastIndex);
    const itemToRemove = this.heap.pop();
    if (itemToRemove) {
      this.valueIndices.delete(itemToRemove.value);
    }

    if (this.isEmpty()) {
      return;
    }

    if (index > 0) {
      const movedItemPriority = this.heap[index].priority;
      const parentPriority = this.heap[this.parent(index)].priority;
      if (movedItemPriority > parentPriority) {
        this.siftUp(index);
        return;
      }
    }

    this.siftDown(index);
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
    const itemI = this.heap[i];
    const itemJ = this.heap[j];
    [this.heap[i], this.heap[j]] = [itemJ, itemI];
    this.valueIndices.set(itemI.value, j);
    this.valueIndices.set(itemJ.value, i);
  }
}
