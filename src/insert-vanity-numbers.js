const AWS = require('aws-sdk');
const convertNumber = require('./convert-number');

AWS.config.update({
  region: "us-west-1",
  endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

function insertVanityNumbers(phoneNum) {
  const table = "VanityNumbers";

  const vanityOptions = convertNumber(phoneNum);

  const params = {
    TableName: table,
    Item: {
      "phoneNumber": phoneNum,
      "vanityOptions": vanityOptions
    }
  };

  console.log("Adding a new item...");
  docClient.put(params, function (err, data) {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
    }
  });
}

module.exports = insertVanityNumbers;
