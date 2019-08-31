const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const CHAT_EVENT = 'chat message';

app.get('/', function(req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', function(socket) {
  io.emit(CHAT_EVENT, {
    user: 'server',
    msg: 'someone connected',
  });

  // Broadcast message to all clients
  socket.on(CHAT_EVENT, event => {
    console.log(event);
    io.emit(CHAT_EVENT, event);
  });

  socket.on('disconnect', reason => {
    console.log('WTFTWFWTFWTF ', reason);
    io.emit(CHAT_EVENT, {
      user: 'server',
      msg: 'someone disconnected',
    });
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
