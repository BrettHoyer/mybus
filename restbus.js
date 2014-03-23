var http = require('http')
// Cowboy
require('restbus').listen();
 
// Standalone
var restbus = require('restbus');
 
restbus.listen('3000', function() {
  console.log('restbus is now listening on port 3000');
});
 
// Embedded
var app = require('express'),
    restbus = require('restbus');
 
http.createServer(app).listen('3030', function() {
  console.log('app is now listening on port 3030');
  restbus.listen(function() {
    console.log('restbus is now listening on port 3535');
  });
});