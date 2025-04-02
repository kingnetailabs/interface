
class MessageQueue {
   constructor() {
    this.queue = [];
  }
 
  enqueue(message) {
    return new Promise((resolve) => {
      this.queue.push(() => {
        message();
        resolve();
      });
    });
  }
 
  dequeue() {
    if (this.queue.length > 0) {
      const nextMessage = this.queue.shift();
      nextMessage();
    }
  }

  getQueuelength() {
    return this.queue.length
  }
}
 
const msgQueue = new MessageQueue();
export { msgQueue };