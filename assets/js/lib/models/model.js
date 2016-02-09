'use strict';

class Model extends Observable {
  constructor(attributes, options){
    super();
    // set the attributes passed
    if(typeof attributes === "object")
      this._attributes = attributes;
    else
      this._attributes = {};
    
    if(typeof options === "object"){
      // apply options...
      Object.keys(options).forEach((k) => {
        let _k = '_' + k;
        this[_k] = options[k];
      });
    }

    // what has changed since construction/sync
    this._changed = {};
  }
  
  set(attr, val){
    let old = this._attributes[attr];
    this._attributes[attr] = val;

    if(old !== val) {
      this._changed[attr] = old;
      this.emit('change', this);
      this.emit('change:'+attr, this, val);
    }
  }

  get(attr){
    return this._attributes[attr];
  }
};