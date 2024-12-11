import LinkedList from './LinkedList.mjs';

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity)
      .fill(null)
      .map(() => new LinkedList());
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  grow() {
    const entriesArray = this.entries();

    this.capacity *= 2;
    this.buckets = new Array(this.capacity)
      .fill(null)
      .map(() => new LinkedList());

    for (const entry of entriesArray) {
      this.set(entry[0], entry[1]);
    }
  }

  bucket(key) {
    const index = this.hash(key) % this.capacity;

    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }

    return this.buckets[index];
  }

  set(key, value) {
    if (this.length() > this.capacity * this.loadFactor) {
      this.grow();
    }

    const bucket = this.bucket(key);
    const keyIndex = bucket.find(key);
    if (keyIndex !== null) {
      bucket.at(keyIndex).value = value;
    } else {
      bucket.append(key, value);
    }
  }

  get(key) {
    const bucket = this.bucket(key);
    const keyIndex = bucket.find(key);
    if (keyIndex !== null) {
      return bucket.at(keyIndex).value;
    }

    return null;
  }

  has(key) {
    const bucket = this.bucket(key);
    return bucket.contains(key);
  }

  remove(key) {
    const bucket = this.bucket(key);
    const keyIndex = bucket.find(key);
    if (keyIndex !== null) {
      bucket.removeAt(keyIndex);
      return true;
    }

    return false;
  }

  length() {
    let count = 0;

    for (const bucket of this.buckets) {
      count += bucket.size();
    }

    return count;
  }

  clear() {
    for (const bucket of this.buckets) {
      bucket.clear();
    }
  }

  keys() {
    let keysArray = [];

    for (const bucket of this.buckets) {
      keysArray.push(...bucket.keys());
    }

    return keysArray;
  }

  values() {
    let valuesArray = [];

    for (const bucket of this.buckets) {
      valuesArray.push(...bucket.values());
    }

    return valuesArray;
  }

  entries() {
    let entriesArray = [];

    for (const bucket of this.buckets) {
      entriesArray.push(...bucket.entries());
    }

    return entriesArray;
  }
}

export default HashMap;
