const {saveLatestMediaId} = require('./s3');
const request = require('request');

const getCaptionForImage = (media, callback) => {
  if (media) {
    const {imageUrl} = media;
    request(
      process.env.COGNITIVE_SERVICES_URL,
      {
        json: true,
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.COGNITIVE_SERVICES_KEY,
        },
        body: {url: imageUrl},
      },
      (error, response, body) => {
        if (error) console.log(error);
        media.captions = body.description.captions;
        saveLatestMediaId(media.id, error => {
          return callback(error, media);
        });
      }
    );
  } else {
    return callback(null, null);
  }
};

module.exports = {getCaptionForImage};
