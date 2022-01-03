const AWS = require('aws-sdk');
const connect = new AWS.Connect();

/**
 * Function that concatenates the first three vanity numbers in an array
 * @param {Array} vanityOptions - An array of strings, each a vanity number
 * @returns {String} topThreeVanities - The concatenated string of first three vanity numbers
 */
function topThreeToString (vanityOptions) {
  let topThreeVanities = '';
  let numOptions;
  vanityOptions.length < 3 ? numOptions = vanityOptions.length : numOptions = 3;
  for (let i = 0; i < numOptions; i++) {
    topThreeVanities += vanityOptions[i];
    if (i !== numOptions - 1) {
      topThreeVanities += ', '
    }
  }
  return topThreeVanities;
}
module.exports = topThreeToString;
