// Make connection
// var socket = io.connect('http://localhost:4000');
var socket = io.connect('/');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');
    feedback = document.getElementById('feedback');
// Emit events (see the index.js to know how it handle)
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
});

message.addEventListener('keypress',function() {
    socket.emit('typing',handle.value);
});

// Listen for events (retrieve event from the server)
socket.on('chat', function(data){
    feedback.innerHTML = ""; //Clear the typing queue while have submitted the message
    //Modify the message in HTMLs
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing',function(data) {
    // the data here is the handle.value (since the action is 'typing')
    feedback.innerHTML = '<p><em>'+data+'is typing message...'+'</em></p>';
});