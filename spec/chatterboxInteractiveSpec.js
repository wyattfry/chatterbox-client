describe('chatterbox', function() {

  describe('interactive', function() {

    before(function() {
      app.init();
    });
    
    it('should fetch and add messages to the DOM', function() {
      // app.clearMessages();
      app.fetch();
      setTimeout(function() {
        expect($('#chats').children().length).to.equal(100);
      }, 1000);
    });
  });
});
