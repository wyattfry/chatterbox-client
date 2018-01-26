// The url you should be using is
// http://parse.hrsf90.hackreactor.com/chatterbox/classes/messages
//
// YOUR CODE HERE:

// Display messages retrieved from the parse server.
var displayMessages = function() {
  var output = 'test';
  
  return output;
};

// Submit message
// Use proper escaping on any user input. Since you're displaying
// input that other users have typed, your app is vulnerable XSS
// attacks. See the section about escaping below.
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.hrsf90.hackreactor.com/chatterbox/classes/messages',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function(data) {
    console.log('chatterbox: Message sent');
  },
  error: function(data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
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


// ------------------ Helpers --------------------


$.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    // data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      console.log('chatterbox: Messages gotten');
    },
    error: function(data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get messages', data);
    }
  });