

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var players = {};
let playerOne = ''
let playerTwo = ''
app.get('/', function(req, res){
  res.json({coco: 'test'});
});

io.on('connection', function(socket){
socket.on('movePlayer', function (e) {
    if (playerOne === '') {
        playerOne = socket.id
    } else if (playerTwo === '') {
        playerTwo = socket.id
    }
    console.log('playserO nde ===>', playerOne);
    console.log('playerTwwo ===>', playerTwo);
    if (socket.id != playerOne){playerTwo = socket.id}
    let toSend = ''
    if(socket.id == playerOne) {toSend = playerTwo}
    else if (socket.id == playerTwo) {toSend = playerOne}
    console.log('toSend =>',toSend);
    io.to(toSend).emit('action', e)
  })
  socket.on('disconnect', function(socket) {
      console.log('ici ma mere');
      if(socket.id === playerOne) {
          playerOne = ''
      }
      if(socket.id === playerTwo) {
          playerTwo = ''
      }
  })
})


//TODO
// prendre les 2 id est le garde dans string
//     si il id === 1 on envoi 2 else on envoit au premier , envoi les information que on a recus

http.listen(3000, function(){
  console.log('listening on *:3000');
});
