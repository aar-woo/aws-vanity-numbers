const words = require('an-array-of-english-words');

const keypad = {
  '2': 'abc',
  '3': 'def',
  '4': 'ghi',
  '5': 'jkl',
  '6': 'mno',
  '7': 'pqrs',
  '8': 'tuv',
  '9': 'wxyz'
}

/**
 * Function that checks if a combination of letters form an actual checking against an-array-of-english-words npm package
 * @param {String} word - A combination of letters from converting a phone number's digits to letters
 * @returns {Boolean} - If the param word exists in an-array-of-english-words
 */
function checkWord(word) {
  if (words.includes(word)) {
    return true;
  }
  return false;
}

/**
 * Function that gets the country and area code from a phone number
 * @param {String} phoneNum - A caller's phone number
 * @returns {String} code - The country and area code of the phone number
 */
function getCountryAreaCodes(phoneNum) {
  const code = `${phoneNum[1]}-${phoneNum.slice(2, 5)}`;
  return code;
}

/**
 * Function that removes the phone number's country and area codes and spaces and dashes
 * @param {String} phoneNum - A caller's phone number
 * @returns {String} parsedNum - Seven digit phone number
 */
function parseNumber(phoneNum) {
  let parsedNum = phoneNum.slice(5).replace(/[' ']/g, '').replace(/[-]/g, '');

  if (parsedNum.includes('0') || parsedNum.includes('1')) {
    console.error('invalid number, cannot include 0 or 1');
    return false;
  }

  return parsedNum;
}

/**
 * Function that creates combinations of corresponding letters on a keypad from a phone number,
 * calls @function checkWord and adds the word to the vanity options with a max of five options
 * @param {String} phoneNum - A caller's sevend digit phone number
 * @returns {Array} vanityOptions - An array of strings, each a vanity number
 */
function convertNumber(phoneNum) {
  const number = parseNumber(phoneNum);
  const countryAreaCode = getCountryAreaCodes(phoneNum);
  const vanityOptions = [];
  const firstLetterOptions = keypad[number[0]];
  const secondLetterOptions = keypad[number[1]];
  const thirdLetterOptions = keypad[number[2]];
  const fourthLetterOptions = keypad[number[3]];
  const fifthLetterOptions = keypad[number[4]];
  const sixthLetterOptions = keypad[number[5]];
  const seventhLetterOptions = keypad[number[6]];
  const firstThreeToWords = [];
  const lastFourToWords = [];

  // Get three letter words from the first three digits and store them in an array
  for (let firstIndex = 0; firstIndex < firstLetterOptions.length; firstIndex++) {
    for (let secondIndex = 0; secondIndex < secondLetterOptions.length; secondIndex++) {
      for (let thirdIndex = 0; thirdIndex < thirdLetterOptions.length; thirdIndex++) {
        const currWord = firstLetterOptions[firstIndex] + secondLetterOptions[secondIndex] + thirdLetterOptions[thirdIndex];
        if (checkWord(currWord)) {
          firstThreeToWords.push(currWord);
        }
      }
    }
  }
  // Get four letter words from the last four digits and store them in an array
  for (let fourthIndex = 0; fourthIndex < fourthLetterOptions.length; fourthIndex++) {
    for (let fifthIndex = 0; fifthIndex < fifthLetterOptions.length; fifthIndex++) {
      for (let sixthIndex = 0; sixthIndex < sixthLetterOptions.length; sixthIndex++) {
        for (let seventhIndex = 0; seventhIndex < seventhLetterOptions.length; seventhIndex++) {
          const currWord = fourthLetterOptions[fourthIndex] + fifthLetterOptions[fifthIndex] + sixthLetterOptions[sixthIndex] + seventhLetterOptions[seventhIndex];
          if (checkWord(currWord)) {
            lastFourToWords.push(currWord);
          }
        }
      }
    }
  }
  // If there are no three letter word options, create vanity options from just four letter word options
  if (firstThreeToWords.length === 0) {
    for (let i = 0; i < lastFourToWords.length; i++) {
      vanityOptions.push(`${countryAreaCode}-${number[0]}${number[1]}${number[2]}-${lastFourToWords[i]}`.toUpperCase());
      if (vanityOptions.length >= 5) {
        return vanityOptions;
      }
    }
  } else {
    // Create combinations of three letter and four letter words and add them to vanity options, example: ('TOY-SPUR')
    for (let i = 0; i < firstThreeToWords.length; i++) {
      for (let j = 0; j < lastFourToWords.length; j++) {
        vanityOptions.push((`${countryAreaCode}-${firstThreeToWords[i]}-${lastFourToWords[j]}`).toUpperCase());
        if (vanityOptions.length >= 5) {
          return vanityOptions;
        }
      }
    }
    // If there are not yet five vanity options, add vanity options made of the first three digits of the phone number
    // combined with four letter word options, example: ('223-BALL')
    for (let k = 0; k < lastFourToWords.length; k++) {
      vanityOptions.push(`${countryAreaCode}-${number[0]}${number[1]}${number[2]}-${lastFourToWords[k]}`.toUpperCase());
      if (vanityOptions.length >= 5) {
        return vanityOptions;
      }
    }
  }
  return vanityOptions;
}

module.exports = convertNumber;

console.log(convertNumber('+18587226925'));
