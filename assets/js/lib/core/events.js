'use strict';

class Observable {
  constructor() {
    this._listeners = new Map();
  }

  addListener(label, cb){
    if(typeof cb  !== 'function'){
      throw new Error('Adding a non-function callback to listener');
    }
    this._listeners.has(label) || this._listeners.set(label, []);
    this._listeners.get(label).push({once: false, cb: cb});
  }

  addOnceListener(label, cb){
    if(typeof cb  !== 'function'){
      throw new Error('Adding a non-function callback to listener');
    }
    this._listeners.has(label) || this._listeners.set(label, []);
    this._listeners.get(label).push({once: true, cb: cb});
  }

  removeListener(label, cb){
    console.log('removing')
    let listeners = this._listeners.get(label),
        index;

    if(!(listeners && listeners.length)){
      throw new Error('Trying to remove a non-existing listener');
    }
    console.log('starting remove', listeners.length)
    index = listeners.reduce((i, listener, index) => {
      return listener === cb
    }, -1);

    if(index > -1){
      listeners.splice(index, 1);
      this._listeners.set(label, listeners);
    }
    console.log('removed', index, listeners.length);
  }

  emit(label, ...args){
    if(!label) return;
    let listeners = this._listeners.get(label),
        reduced = [];

    // nothing to emit to - be graceful
    if(!(listeners && listeners.length)) return;
    
    listeners.forEach((listener) => {
      if(!listener.once) reduced.push(listener);
      listener.cb(...args);
    });

    // reset cb's with once types removed
    this._listeners.set(label, reduced);
    
  }
}