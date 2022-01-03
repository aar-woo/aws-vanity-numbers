const AWS = require('aws-sdk');
const connect = new AWS.Connect();

function topThreeToString (vanityOptions) {
  let topThreeVanities = '';
  let numOptions;
  vanityOptions.length < 3 ? numOptions = vanityOptions.length : numOptions = 3;
  for (let i = 0; i < numOptions; i++) {
    topThreeVanities += vanityOptions[i] + ' ';
  }
  return topThreeVanities;
}
module.exports = topThreeToString;
