// Setup ENV variables
const dotenv = require('dotenv')
dotenv.config();

exports.lamda = (event, context, callback) => {
  return callback(null, 'Helllllllo, Lamda!');
}
