// var http = require('http');
// // var sockjs = require('sockjs');

// // var echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js' });
// // echo.on('connection', function(conn) {
// //   console.log("adsfasdfa");
// //     conn.on('data', function(message) {
// //         conn.write(message);

// //     });
// //     conn.on('close', function() {});
// // });

// var server = http.createServer();
// // echo.installHandlers(server, {prefix:'/echo'});
// server.listen(8000);

var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/test', function (req, res) {
  console.log(new Date());
  res.send('hello world')
})

var server = app.listen(8000, function () {  
});  


