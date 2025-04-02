
class EventEmitter {
  constructor() {
    this.listeners = {};
  }
 
  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }
 
  emit(event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(listener => listener.apply(this, args));
    }
  }
}
 
// 使用事件
const emitter = new EventEmitter();

export { emitter }