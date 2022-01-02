const AWS = require("aws-sdk");
const convertNumber = require('./src/convert-number');
const insertVanityNumbers = require('./src/insert-vanity-numbers');
// const setContactVanities = require('./src/set-contact-vanities');

exports.handler = async function(event, context, callback) {
  const phoneNum = event['Details']['ContactData']['CustomerEndpoint']['Address'];
  const initialContactId = event['Details']['ContactData']['InitialContactId'] // for updating contact attributes with vanity options
  const vanityNumbers = convertNumber(phoneNum);

  // await setContactVanities(vanityNumbers, initialContactId);

  const response = {
    PhoneNumber: phoneNum,
    VanityNumbers: vanityNumbers
  }
  await insertVanityNumbers(phoneNum, vanityNumbers).then(() => {
    callback(null, {
      statusCode: 201,
      body: response
    })
  }).catch((err) => {
    console.error(err);
  });
}
