const AWS = require("aws-sdk");
const convertNumber = require('./src/convert-number');
const insertVanityNumbers = require('./src/insert-vanity-numbers');
const topThreeToString = require("./src/top-three-to-string");

exports.handler = async function (event, context, callback) {
  const phoneNum = event['Details']['ContactData']['CustomerEndpoint']['Address'];
  const initialContactId = event['Details']['ContactData']['InitialContactId'] // for updating contact attributes with vanity options
  const vanityNumbers = convertNumber(phoneNum);
  const topThreeVanities = topThreeToString(vanityNumbers);
  const response = {
    PhoneNumber: phoneNum,
    TopThreeVanities: topThreeVanities
  }
  await insertVanityNumbers(phoneNum, vanityNumbers).then(() => {
    callback(null, response);
  }).catch((err) => {
    console.error(err);
  });
}
