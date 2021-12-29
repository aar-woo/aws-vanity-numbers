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
    await insertVanityNumbers(vanityNumbers);
    return response;
  }
  catch (err) {
    console.error(err);
    return;
  }
}

// function handle(phoneNum) {
//   try {
//     const vanityNumbers = convertNumber(phoneNum);
//     const response = {
//       PhoneNumber: phoneNum,
//       VanityNumbers: vanityNumbers
//     }
//     // await insertVanityNumbers(phoneNum, vanityNumbers);
//     return response;
//   }
//   catch (err) {
//     console.error(err);
//     return;
//   }
// }

// console.log(handle('+1-800-356-9377'));
