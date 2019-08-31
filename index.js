const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const CHAT_EVENT = 'chat message';

app.get('/', function(req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', function(socket) {
  io.emit(CHAT_EVENT, 'server: someone connected');

  socket.on(CHAT_EVENT, event => {
    console.log(event);
    io.emit(CHAT_EVENT, event);
  });

  socket.on('disconnect', reason => {
    console.log('WTFTWFWTFWTF ', reason);
    io.emit(CHAT_EVENT, 'server: someone disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
