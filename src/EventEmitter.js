export class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(type, cb) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(cb);
  }

  emit(type, data) {
    if (this.events[type]) {
      this.events[type].forEach(cb => cb(data));
    }
  }
}
