
class Node{
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class Queue {
    constructor(values = []) {
        this.head = null;
        this.tail = null;
        this.size = 0;

        for (const value of values) {
            this.push(value);
        }
    }
    // Shift an element from front to back
    pop_push() {
        const popped_val = this.pop();
        this.push(popped_val);
        return popped_val;
    }

    // Adds an element to the queue
    push(val) {
        const node = new Node(val);
        if(!this.head){
            this.head = node;
            this.tail = node;
        }
        else{
            this.tail.next = node;
            this.tail = node;
        }
        this.size += 1;
    }

    // Removes and returns the front element from the queue
    pop() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        const val = this.head.val;
        var currObj = this.head;

        this.head = this.head.next;
        currObj = null; // memory freed
        this.size -= 1;

        return val;
    }

    // Returns the front element of the queue without removing it
    front() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.head.val;
    }

    // Checks if the queue is empty
    isEmpty() {
        return this.size === 0;
    }

    // Returns the size of the queue
    length() {
        return this.size;
    }
}

module.exports = Queue;