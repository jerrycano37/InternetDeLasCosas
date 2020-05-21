var express = require('express');
var app = express();
var io = require('socket.io')(app.listen(8081));
var five = require('johnny-five');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var board = new five.Board({
  repl: false
});

board.on('ready', function () {
   
  var relay1 = new five.Relay(9);
  var relay2 = new five.Relay(10);

  io.on('connection', function (socket) {

    socket.on('LedOn1', function () {
      console.log('Led 1 Encendida');
      relay1.on();
    });

    socket.on('LedOff1', function () {
      console.log('Led 1 Apagada');
      relay1.off();
    });

    socket.on('LedOn2', function () {
      console.log('Led 2 Encendida');
      relay2.on();
    });

    socket.on('LedOff2', function () {
      console.log('Led 2 Apagada');
      relay2.off();
    });
     
  });

});
