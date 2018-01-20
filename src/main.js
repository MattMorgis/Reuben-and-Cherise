// Setup ENV variables
const dotenv = require('dotenv');
dotenv.config();

const AWS = require('aws-sdk');
const async = require('async');
const request = require('request');

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_URL =
  'https://api.instagram.com/v1/users/self/media/recent/?access_token=' +
  INSTAGRAM_ACCESS_TOKEN;

AWS.config.update({
  accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
  secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
});
const s3bucket = new AWS.S3({params: {Bucket: 'image-caption'}});

const COGNITIVE_SERVICES_URL =
  'https://eastus.api.cognitive.microsoft.com/vision/v1.0/describe/';

const getLatestInstagramId = callback => {
  request(
    'https://s3.amazonaws.com/image-caption/last-media-id.json',
    {json: true},
    (error, response, body) => {
      return callback(error, body.mediaId);
    }
  );
};

const writeLatestInstagramId = (mediaId, callback) => {
  const params = {
    ACL: 'public-read',
    Key: 'last-media-id.json',
    Body: JSON.stringify({mediaId}),
  };
  s3bucket.upload(params, (err, res) => {
    if (err) console.log('Error in uploading file on s3 due to ' + err);
    return callback(err);
  });
};

const fetchLatestMedia = (latestUsedMediaId, callback) => {
  request(INSTAGRAM_URL, {json: true}, (error, response, body) => {
    if (error) {
      console.log(error);
      return callback(error);
    }
    const latestMedia = body.data[4];
    const media =
      latestUsedMediaId !== latestMedia.id // TODO: Change this back
        ? {
            id: latestMedia.id,
            url: latestMedia.images.standard_resolution.url,
          }
        : null;
    return callback(null, media);
  });
};

const getLatestInstagramURL = callback => {
  async.waterfall(
    [
      getLatestInstagramId,
      fetchLatestMedia,
      (media, callback) => {
        if (media) {
          writeLatestInstagramId(media.id, error => {
            return callback(error, media.url);
          });
        } else {
          return callback(null, null);
        }
      },
    ],
    (error, data) => {
      console.log(error);
      return callback(error, data);
    }
  );
};

const getCaptionForImage = (imageURL, callback) => {
  if (imageURL) {
    request(
      COGNITIVE_SERVICES_URL,
      {
        json: true,
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': '782a4529734e4df99e12310f5767a543',
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

const lamda = (event, context, callback) => {
  async.waterfall(
    [getLatestInstagramURL, getCaptionForImage],
    (error, result) => {
      if (!result) result = 'There was no new image posted.';
      return callback(error, result);
    }
  );
};

exports.lamda = lamda;
