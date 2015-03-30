var express = require('express'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function(socket) {

  socket.on('createNote', function(data) {
    socket.broadcast.emit('onNoteCreated', data);
  });

  socket.on('changePattern', function(data) {
	 socket.broadcast.emit('onPatternChanged', data);
  });

  socket.on('changeBeat', function(data){
	 socket.broadcast.emit('onBeatChanged', data);
  });

  socket.on('deleteNote', function(data){
	 socket.broadcast.emit('onNoteDeleted', data);
  });
});

var port = Number(process.env.PORT || 2311);
server.listen(port);