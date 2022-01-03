const AWS = require("aws-sdk");
const convertNumber = require('./src/convert-number');
const insertVanityNumbers = require('./src/insert-vanity-numbers');
const topThreeToString = require("./src/top-three-to-string");

/**
 * Function that converts a caller's phone number to vanity numbers, inserts them into a Dynamo DB table
 * and responds with an object containing the caller's phone number and their top three vanity numbers
 * @param {Object} event - The event object from AWS service invocation
 * @param {Object} context - The context object
 * @param {Function} callback - Function that returns a response or error to the invoker
 */
exports.handler = async function (event, context, callback) {
  // Gets the caller's phone number from the event request object
  const phoneNum = event['Details']['ContactData']['CustomerEndpoint']['Address'];
  const vanityNumbers = convertNumber(phoneNum);
  const topThreeVanities = topThreeToString(vanityNumbers);
  const response = {
    PhoneNumber: phoneNum,
    TopThreeVanities: topThreeVanities
  }
  await insertVanityNumbers(phoneNum, vanityNumbers)
    .then(() => {
      callback(null, response);
    })
    .catch((err) => {
      console.error(err);
    });
}
