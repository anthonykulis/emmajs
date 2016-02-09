'use strict';

class App{
  constructor(){
    console.log('app running')
    this.model = new Model({a: 'a'}, {url: 'blah.com'});
    this.model.set('b', 'yo');
    console.log('model', this.model);
  }
}