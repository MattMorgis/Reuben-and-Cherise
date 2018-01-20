const async = require('async');
const request = require('request');
const {getLatestMediaId, saveLatestMediaId} = require('./s3');

const INSTAGRAM_URL =
  'https://api.instagram.com/v1/users/self/media/recent/?access_token=' +
  process.env.INSTAGRAM_ACCESS_TOKEN;

const getLatestMediaFromInstagram = callback => {
  request(INSTAGRAM_URL, {json: true}, (error, response, body) => {
    if (error) {
      console.log('Error fetching media from Instagram: ' + error);
      return callback(error);
    }
    const latestMedia = body.data[0];
    const media = {
      id: latestMedia.id,
      imageUrl: latestMedia.images.standard_resolution.url,
      link: latestMedia.link,
    };
    return callback(null, media);
  });
};

const getLatestInstagramURL = callback => {
  async.parallel(
    [getLatestMediaId, getLatestMediaFromInstagram],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      const [mediaId, media] = results;
      if (media.id !== mediaId) {
        saveLatestMediaId(media.id, error => {
          return callback(error, media);
        });
      } else {
        return callback(null, null);
      }
    }
  );
};

module.exports = {getLatestInstagramURL};
