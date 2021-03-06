// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');

// Emit events (see the index.js to know how it handle)
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
});

// Listen for events (retrieve event from the server)
socket.on('chat', function(data){
    //Modify the message with HTMLs
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});