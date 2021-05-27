var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function(requist,response){
    response.sendFile(__dirname + '/index.html');
});
console.log('server running');

users = [];
connections = [];

io.sockets.on('connection',function(socket){
    console.log('done');
    connections.push(socket);

    socket.on('disconnect',function(info){
    connections.splice(connections.indexOf(socket),1);
    console.log('exit');
    });
    
    socket.on('send massage', function(info){
        io.sockets.emit('add massage to list', {massage: info.massage, name: info.name, className: info.className});
    });
});