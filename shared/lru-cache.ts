class CacheNode<T> {
  constructor(
    public key: string,
    public value: T,
    public next: CacheNode<T> | null = null,
    public previous: CacheNode<T> | null = null,
  ) {}
}

export class LRUCache<T> {
  private limit: number;
  private cache: Map<string, CacheNode<T>> = new Map<string, CacheNode<T>>();
  private size = 0;
  private head: CacheNode<T> | null = null;
  private tail: CacheNode<T> | null = null;

  constructor(initial: { key: string; value: T }[] = [], limit = 10) {
    this.limit = limit;

    for (let i = (initial?.length || 0) - 1; i >= 0; --i) {
      this.write(initial[i].key, initial[i].value);
    }
  }

  write(key: string, value: T): void {
    if (!this.head) {
      this.head = this.tail = new CacheNode<T>(key, value);
    } else {
      if (this.cache.has(key)) {
        this.remove(key);
      }

      const newNode = new CacheNode<T>(key, value, this.head);
      this.head.previous = newNode;
      this.head = newNode;
    }

    this.cache.set(key, this.head);
    this.size++;
    this.ensureLimit();
  }

  read(key: string): T {
    let result: T;

    if (this.cache.has(key)) {
      result = this.cache.get(key).value;
      this.remove(key);
      this.write(key, result);
    }

    return result;
  }

  remove(key: string): void {
    if (this.cache.has(key)) {
      const node = this.cache.get(key);

      if (node.previous) {
        node.previous.next = node.next;
      } else {
        this.head = node.next;
      }

      if (node.next) {
        node.next.previous = node.previous;
      } else {
        this.tail = node.previous;
      }

      this.cache.delete(key);
      this.size--;
    }
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.cache = new Map<string, CacheNode<T>>();
  }

  toArray(): T[] {
    const result: T[] = [];
    this.forEach((node) => result.push(node.value));
    return result;
  }

  forEach(fn: (node: CacheNode<T>, counter: number) => void): void {
    let node = this.head;
    let counter = 0;
    while (node) {
      fn(node, counter);
      node = node.next;
      counter++;
    }
  }

  private ensureLimit(): void {
    if (this.size > this.limit && this.tail) {
      this.remove(this.tail.key);
    }
  }
}
