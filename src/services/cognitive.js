const request = require('request');

const getCaptionForImage = (imageURL, callback) => {
  if (imageURL) {
    request(
      process.env.COGNITIVE_SERVICES_URL,
      {
        json: true,
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.COGNITIVE_SERVICES_KEY,
        },
        body: {url: imageURL},
      },
      (error, response, body) => {
        if (error) console.log(error);
        return callback(error, body.description.captions);
      }
    );
  } else {
    return callback(null, null);
  }
};

module.exports = {getCaptionForImage};
