'use strict';

// Hardcoded 'session'
var currentUser = Ember.Object.create({
  id: 999999,
  profile_banner_url: 'https://pbs.twimg.com/profile_banners/9081962/1410982630/1500x500',
  profile_image_url_https: 'https://pbs.twimg.com/profile_images/514460135389802496/7jzASuMU_400x400.jpeg',
  name: 'Erick Ruiz de Chavez',
  screen_name: 'erickrdch'
});

module.exports = function (App) {
  App.UserController = Ember.ObjectController.extend({
    tweetText: '',
    boxSize: 'small',
    actions: {
      postTweet: function (content) {
        var tweet = Ember.Object.create({
          created_at: new Date(),
          text: content,
          user: currentUser
        });

        this.get('tweets').unshiftObject(tweet);

        // Not good.
        this.set('tweetText', '');
        this.set('boxSize', 'small');

        // Ugh!
        $('.new-tweet').blur();
      },

      growTweetBox: function () {
        this.set('boxSize', 'large');
      },

      shrinkTweetBox: function () {
        this.set('boxSize', 'small');
      }
    }
  });
};
