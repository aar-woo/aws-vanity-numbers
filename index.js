const AWS = require("aws-sdk");
const convertNumber = require('./src/convert-number')
const insertVanityNumbers = require('./src/insert-vanity-numbers');

exports.handler = async function(event, context) {
  const phoneNum = event['Details']['ContactData']['CustomerEndpoint']['Address'];
  try {
    const vanityNumbers = await convertNumber(phoneNum);
    const response = {
      PhoneNumber: phoneNum,
      VanityNumbers: vanityNumbers
    }
    return response;
  }
  catch (err) {
    console.error(err);
    return;
  }
}

// function handle(phoneNum) {
//   const response = {
//     PhoneNumber: phoneNum,
//     VanityNumbers: convertNumber(phoneNum)
//   }
//   return response;
// }

// console.log(handle('+1-800-356-9377'));
