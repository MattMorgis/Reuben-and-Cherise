const request = require('request');

let FB_URL =
  'https://graph.facebook.com/v2.11/me/feed?access_token=' +
  process.env.FACEBOOK_ACCESS_TOKEN +
  '&message=';

const postCaptionToFacebook = (media, callback) => {
  if (media) {
    const postMessage = encodeURIComponent(
      media.captions[0].text + '\n#MachineLearning #AI\n' + media.link
    );
    console.log(postMessage);
    FB_URL += postMessage;
    console.log(FB_URL);
    request(
      FB_URL,
      {
        json: true,
        method: 'POST',
      },
      (error, response, body) => {
        if (error) console.log(error);
        console.log(body);
        return callback(error, media);
      }
    );
  } else {
    return callback(null, null);
  }
};

module.exports = {postCaptionToFacebook};
