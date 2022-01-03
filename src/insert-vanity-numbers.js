const AWS = require('aws-sdk');
const convertNumber = require('./convert-number');
const docClient = new AWS.DynamoDB.DocumentClient();

AWS.config.update({
  region: "us-west-2"
});
/**
 * Function that updates or inserts a new item into a Dynamo DB table
 * @param {String} phoneNum  - A caller's phone number
 * @param {Array} vanityOptions - An array of strings, each a vanity number
 */
async function insertVanityNumbers(phoneNum, vanityOptions) {
  const table = "VanityNumbers";
  const params = {
    TableName: table,
    Item: {
      "phoneNumber": phoneNum,
      "vanityOptions": vanityOptions
    }
  };

  console.log("Adding a new item...");
  docClient.put(params).promise();
}

module.exports = insertVanityNumbers;
