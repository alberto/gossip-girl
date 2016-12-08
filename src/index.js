class EventEmitter {
  constructor() {
    this.registry = {};
  }
  
  emit(eventName) {
    const events = this.registry[eventName];
    if (!events) return;
    events.forEach((event) => event());
  }
  
  on(eventName, fn) {
    if (!(eventName in this.registry)) { 
      this.registry[eventName] = []; 
    }
     
    this.registry[eventName].push(fn);
  }
  
  off(eventName, fn){
    const events = this.registry[eventName];
    if (!events) return;
    
    const pos = events.indexOf(fn);
    if (pos >= 0) {
      events.splice(pos);
    }
  }
  
  once(eventName, fn) {
    var self = this;
    this.on(eventName, function wrapper() {
      self.off(eventName, wrapper);
      fn();      
    });
  }
}

export default EventEmitter;
