class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class Queue {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
  
    push(value) {
      const newNode = new Node(value);
      if (!this.tail) {
        this.head = this.tail = newNode;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }
      this.length++;
    }
  
    pop() {
      if (!this.head) return null;
      const value = this.head.value;
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.length--;
      return value;
    }
  
    size() {
      return this.length;
    }
  }
  
  export default Queue;
  