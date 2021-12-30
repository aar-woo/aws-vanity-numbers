const AWS = require("aws-sdk");
const convertNumber = require('./src/convert-number');
const insertVanityNumbers = require('./src/insert-vanity-numbers');

exports.handler = async function(event, context, callback) {
  const phoneNum = event['Details']['ContactData']['CustomerEndpoint']['Address'];
  const vanityNumbers = await convertNumber(phoneNum);
  const response = {
    PhoneNumber: phoneNum,
    VanityNumbers: vanityNumbers
  }
  await insertVanityNumbers(phoneNum, vanityNumbers).then(() => {
    callback(null, {
      statusCode: 201,
      body: 'New item added to table'
    })
  }).catch((err) => {
    console.error(err);
  });
}
