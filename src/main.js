const dotenv = require('dotenv');
dotenv.config();

const async = require('async');

const {getLatestInstagramURL} = require('./services/instagram');
const {getCaptionForImage} = require('./services/cognitive');
const {postCaptionToFacebook} = require('./services/facebook');

const lamda = (event, context, callback) => {
  async.waterfall(
    [getLatestInstagramURL, getCaptionForImage, postCaptionToFacebook],
    (error, result) => {
      if (!result)
        result =
          'There was no new image posted, will check again in 180 seconds.';
      return callback(error, result);
    }
  );
};

exports.lamda = lamda;
