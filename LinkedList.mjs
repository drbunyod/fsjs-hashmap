import Node from './Node.mjs';

class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
  }

  append(key, value) {
    const newNode = new Node(key, value);

    if (this.head === null) {
      this.head = newNode;
    } else {
      let tmp = this.head;
      while (tmp.nextNode !== null) {
        tmp = tmp.nextNode;
      }

      tmp.nextNode = newNode;
    }

    this.tail = newNode;
  }

  prepend(key, value) {
    const newNode = new Node(key, value, this.head);
    this.head = newNode;

    if (this.tail === null) {
      this.tail = newNode;
    }
  }

  size() {
    if (this.head === null) {
      return 0;
    }

    let count = 1;
    let tmp = this.head;
    while (tmp.nextNode !== null) {
      count++;
      tmp = tmp.nextNode;
    }

    return count;
  }

  get head() {
    return this._head;
  }

  set head(node) {
    this._head = node;
  }

  get tail() {
    return this._tail;
  }

  set tail(node) {
    this._tail = node;
  }

  at(index) {
    let count = 0;
    let tmp = this.head;
    while (tmp !== null) {
      if (count === index) {
        return tmp;
      }

      count++;
      tmp = tmp.nextNode;
    }

    return null;
  }

  pop() {
    if (this.head === null) {
      return;
    }

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return;
    }

    let prev = this.head;
    let cur = this.head.nextNode;

    while (cur.nextNode !== null) {
      prev = prev.nextNode;
      cur = cur.nextNode;
    }

    prev.nextNode = null;
    this.tail = prev;
  }

  contains(key) {
    let tmp = this.head;
    while (tmp !== null) {
      if (tmp.key === key) {
        return true;
      }

      tmp = tmp.nextNode;
    }

    return false;
  }

  find(key) {
    let count = 0;
    let tmp = this.head;
    while (tmp !== null) {
      if (tmp.key === key) {
        return count;
      }

      count++;
      tmp = tmp.nextNode;
    }

    return null;
  }

  insertAt(key, value, index) {
    if (index >= 0 && index <= this.size()) {
      const prev = this.at(index - 1);
      const next = this.at(index);
      const newNode = new Node(key, value, next);

      if (index === 0) {
        this.head = newNode;
      } else {
        prev.nextNode = newNode;
      }
    }
  }

  removeAt(index) {
    if (index >= 0 && index < this.size()) {
      const prev = this.at(index - 1);
      const next = this.at(index + 1);

      if (index === 0) {
        this.head = next;
      } else {
        prev.nextNode = next;
      }
    }
  }

  keys() {
    let keysArray = [];
    let tmp = this.head;
    while (tmp !== null) {
      keysArray.push(tmp.key);
      tmp = tmp.nextNode;
    }

    return keysArray;
  }

  values() {
    let valuesArray = [];
    let tmp = this.head;
    while (tmp !== null) {
      valuesArray.push(tmp.value);
      tmp = tmp.nextNode;
    }

    return valuesArray;
  }

  entries() {
    let entriesArray = [];
    let tmp = this.head;
    while (tmp !== null) {
      entriesArray.push([tmp.key, tmp.value]);
      tmp = tmp.nextNode;
    }

    return entriesArray;
  }

  toString() {
    let str = '';
    let tmp = this.head;
    while (tmp !== null) {
      str += `( ${tmp.key}: ${tmp.value} ) -> `;
      tmp = tmp.nextNode;
    }

    str += 'null';
    console.log(str);
  }
}

export default LinkedList;
