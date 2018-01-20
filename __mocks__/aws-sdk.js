const AWS = jest.genMockFromModule('aws-sdk');

AWS.S3 = function(options) {
  return {
    upload: function(params, callback) {
      console.log(params);
      return callback(null);
    },
  };
};

module.exports = AWS;
