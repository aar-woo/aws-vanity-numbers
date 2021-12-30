const AWS = require('aws-sdk');
const convertNumber = require('./convert-number');

AWS.config.update({
  region: "us-west-2"
  // region: "us-west-1",
  // endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

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
