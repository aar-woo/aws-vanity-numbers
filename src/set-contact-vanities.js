const AWS = require('aws-sdk');
const connect = new AWS.Connect();

async function setContactVanities(vanityOptions, initialContactId) {
  let topThreeVanities = '';
  for (let i = 0; i < 3; i++) {
    topThreeVanities += vanityOptions[i] + ' ';
  }
  const params = {
    Attributes: {
      vanityOptions: topThreeVanities
    },
    InitialContactId: initialContactId,
    InstanceId: 'b117e152-5afa-4493-b802-2d96e7bd7bc9'
  }
  connect.updateContactAttributes(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  })
}

module.exports = setContactVanities;
