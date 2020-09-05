var express = require('express');
var socket = require ('socket.io');
// App setup
var app = express();
var PORT = process.env.PORT || 4000; //process.env.PORT: port supplied by the server
var server = app.listen(PORT, function(){
    console.log('listening for requests on port 4000,');
});

// Static files (public folder to serve)
app.use(express.static('public'));

//Socket setup
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data) {
        //broadcasting the message from the server to all of the clients
        socket.broadcast.emit('typing',data);
    });
});