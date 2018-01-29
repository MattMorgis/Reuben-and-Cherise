const Twit = require('twit');

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
});

const postCaptionToTwitter = (media, callback) => {
  if (media) {
    const postMessage =
      media.captions[0].text +
      ' \n' +
      media.link +
      '\n#MachineLearning #CognitiveServices \n';
    T.post('statuses/update', {status: postMessage}, (err, data, response) => {
      return callback(err, media);
    });
  } else {
    return callback(null, null);
  }
};

module.exports = {postCaptionToTwitter};
