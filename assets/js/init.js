'use strict';

// var app = new App();

var m = new Model();

var f = function(m){console.log('change',m);};
m.addListener('change', f);
m.addListener('change', f);
m.addOnceListener('change:id', function(m,id){ console.log('change:id', m, id)});


m.set('id', 1);
m.removeListener('change', f);
console.log('model', m);