const AWS = require('aws-sdk');
const request = require('request');

const Bucket = process.env.S3_BUCKET;
const mediaIdFileName = process.env.MEDIA_ID_FILE_NAME;

const saveLatestMediaId = (mediaId, callback) => {
  const params = {
    ACL: 'public-read',
    Key: mediaIdFileName,
    Body: JSON.stringify({mediaId}),
  };
  const s3bucket = new AWS.S3({params: {Bucket}});
  s3bucket.upload(params, (error, res) => {
    if (error) console.log('Error in uploading file on s3 due to ' + error);
    return callback(error);
  });
};

const getLatestMediaId = callback => {
  const Bucket = process.env.S3_BUCKET;
  const s3 = 'https://s3.amazonaws.com/' + Bucket + '/' + mediaIdFileName;
  request(s3, {json: true}, (error, response, body) => {
    if (error) console.log('Error getting file from S3: ' + error);
    return callback(error, body.mediaId);
  });
};

module.exports = {getLatestMediaId, saveLatestMediaId};
