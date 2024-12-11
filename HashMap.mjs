import LinkedList from './LinkedList.mjs';

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];
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
    this.capacity *= 2;

    const newBuckets = [];
    for (let i = 0; i < this.capacity; i++) {
      newBuckets.push([]);
    }

    const entriesArray = this.entries();
    this.buckets = newBuckets;
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

    if (bucket.length === 0) {
      const list = new LinkedList();
      list.append(key, value);
      bucket.push(list);
    } else {
      const list = bucket[0];
      const keyIndex = list.find(key);

      if (keyIndex !== null) {
        list.at(keyIndex).value = value;
      } else {
        list.append(key, value);
      }
    }
  }

  get(key) {
    const bucket = this.bucket(key);
    if (bucket.length === 0) {
      return null;
    }

    const list = bucket[0];
    const keyIndex = list.find(key);

    if (keyIndex !== null) {
      return list.at(keyIndex).value;
    }

    return null;
  }

  has(key) {
    const bucket = this.bucket(key);
    if (bucket.length === 0) {
      return false;
    }

    return bucket[0].contains(key);
  }

  remove(key) {
    const bucket = this.bucket(key);
    if (bucket.length === 0) {
      return false;
    }

    const list = bucket[0];
    const keyIndex = list.find(key);

    if (keyIndex !== null) {
      list.removeAt(keyIndex);
      return true;
    }

    return false;
  }

  length() {
    let count = 0;

    for (const bucket of this.buckets) {
      if (bucket.length > 0) {
        count += bucket[0].size();
      }
    }

    return count;
  }

  clear() {
    for (const bucket of this.buckets) {
      bucket.length = 0;
    }
  }

  keys() {
    let keysArray = [];

    for (const bucket of this.buckets) {
      if (bucket.length > 0) {
        keysArray.push(...bucket[0].keys());
      }
    }

    return keysArray;
  }

  values() {
    let valuesArray = [];

    for (const bucket of this.buckets) {
      if (bucket.length > 0) {
        valuesArray.push(...bucket[0].values());
      }
    }

    return valuesArray;
  }

  entries() {
    let entriesArray = [];

    for (const bucket of this.buckets) {
      if (bucket.length > 0) {
        entriesArray.push(...bucket[0].entries());
      }
    }

    return entriesArray;
  }
}

export default HashMap;
