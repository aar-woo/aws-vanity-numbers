// create a function to convert a phone number to vanity number options
// create an object representing the numbers and corresponding letters on a phone
// create seven letter words from the phone number
  // check if the word is an actual word, using wordsapi.com


function convertNumber(phoneNum) {
  const regLetters = /[a-zA-Z]/g;
  const parsedNum = phoneNum.replace(/[' ']/g, '').replace(/[-]/g,'');
  if (parsedNum.length !== 10 || regLetters.test(parsedNum)) {
    console.error('invalid number');
  }
}

convertNumber('808-234-4426');
