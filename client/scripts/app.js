// YOUR CODE HERE:
var app = {};

app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';

app.messages = [];

app.rooms = [];

app.init = function() {
  $('.create-new-room-form').hide();
  $('.username').on('click', this.handleUsernameClick);
  $('#send .submit').on('submit', this.handleSubmit);
  $('#roomSelect').on('change', this.showRoomClick);
  $('.open-create-new-room-form').on('click', this.openCreateNewRoomFormClick);
  $('.create-room-button').on('click', this.createRoomButtonClick);
};

// Messages section
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

app.clearMessages = function() {
  $('#chats').text('');
};

// Display messages retrieved from the parse server.
app.renderMessage = function(message) {
  let $messageContainer = $(`<div class="messageContainer" data-roomname="${message.roomname || 'lobby'}"></div>`);
  let $user = $('<span class="username"></span>').text(message.username);
  let $messageText = $('<span class="messageText"></span>').text(message.text);
  $messageContainer.append($user);
  $messageContainer.append($messageText);
  $('#chats').append($messageContainer);
};

app.handleSubmit = function() {

};

// Rooms section
app.extractRooms = function(data) {
  this.rooms = _.uniq(this.rooms.concat(data.map(message => message.roomname)));
  console.log(this.rooms);
  this.rooms.forEach(room => this.renderRoom(room));
};

app.renderRoom = function(roomName) {
  let $roomNode = $(`<option value ="${roomName}">${roomName}</option>`);
  $('#roomSelect').append($roomNode);
};

app.showRoomClick = function() {
  let room = $('#roomSelect option:selected').val();
  let roomMessages = app.messages.filter(x => x.roomname === room);
  app.clearMessages();
  roomMessages.forEach(msg => app.renderMessage(msg));
};

app.openCreateNewRoomFormClick = function() {
  $('.create-new-room-form').show();
};

app.isValidFormByClass = function(formClass) {
  let formIsValid = true;
  $(`${formClass} :input:visible[required="required"]`).each(function() {
    if (!this.validity.valid || $(this).val() === '') {
      $(this).focus();
      formIsValid = false;
      return false;
    }
  });
  return formIsValid;
};

app.createRoomButtonClick = function() {
  if (!app.isValidFormByClass('.create-new-room-form')) {
    return;
  }
  let roomName = $('.room-name').val();
  if (_.contains(app.rooms, roomName)) {
    // TODO: display error
    return;
  }
  app.rooms.push(roomName);
  $('.create-new-room-form').hide();
  app.renderRoom(roomName);
  $('#roomSelect').val(roomName); //selects the room
  app.clearMessages();
};


// User section
app.handleUsernameClick = function() {

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
