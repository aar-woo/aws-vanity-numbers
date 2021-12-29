const AWS = require("aws-sdk");
const convertNumber = require('./convert-number');
const insertVanityNumbers = require('./insert-vanity-numbers');

exports.handler = async (event, context, callback) => {
  const phoneNum = event['Details']['ContactData']['CustomerEndpoint']['Address'];
  const response = {
    PhoneNumber: phoneNum
  }
  callback(null, response);
}

// insertVanityNumbers('463-3339');
