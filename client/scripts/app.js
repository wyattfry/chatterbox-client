// YOUR CODE HERE:
var app = {};

app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';

app.messages = [];

app.rooms = [];

app.init = function() {
  $('.username').on('click', this.handleUsernameClick);
  $('#send .submit').on('submit', this.handleSubmit);
};

app.send = function(obj) {
  $.ajax({
    url: this.server,
    type: 'POST',
    data: obj,
    contentType: 'application/json',
    success: function() {}
  });
};

app.fetch = function() {
  $.ajax({
    url: this.server,
    type: 'GET',
    data: {order: '-createdAt'},
    success: function(data) {
      console.log(data);
      data.results.forEach(msg => {
        for (let k in msg) {
          msg[k] = _.escape(msg[k]);
        }
      });
      console.log(data);
      app.messages = app.messages.concat(data.results);
      app.extractRooms(data.results);
      app.messages.reduceRight((acc, el) => app.renderMessage(el));
    },
    error: function(error) {
      console.log('Fetch failed:', error);
    }
  });
};

// Display messages retrieved from the parse server.

app.clearMessages = function() {
  $('#chats').text('');
};

app.extractRooms = function(data) {
  this.rooms = _.uniq(this.rooms.concat(data.map(message => message.roomname)));
  console.log(this.rooms);
  this.rooms.forEach(room => this.renderRoom(room));
};

app.renderMessage = function(message) {
  let $messageContainer = $(`<div class="messageContainer" data-roomname="${message.roomname || 'lobby'}"></div>`);
  let $user = $('<span class="username"></span>').text(message.username);
  let $messageText = $('<span class="messageText"></span>').text(message.text);
  $messageContainer.append($user);
  $messageContainer.append($messageText);
  $('#chats').append($messageContainer);
};

app.renderRoom = function(roomName) {
  $('#roomSelect').append($(`<option value ="${roomName}">${roomName}</option>`));
};

app.handleUsernameClick = function() {
  
};

app.showRoomClick = function() {
  $('');
  this.clearMessages();
  
};

app.handleSubmit = function() {
  
};

$(function() {
  app.init();
  app.fetch();
});


// Setup a way to refresh the displayed messages (either automatically
// or with a button)

// Allow users to select a user name for themself and to be able to
// send messages

// Rooms
// Allow users to create rooms and enter existing rooms - Rooms are
// defined by the .roomname property of messages, so you'll need to
// filter them somehow.

// Socializing
// Allow users to 'befriend' other users by clicking on their user name
// Display all messages sent by friends in bold