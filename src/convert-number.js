const words = require('an-array-of-english-words');

const keypad = {
  '0': null,
  '1': null,
  '2': 'abc',
  '3': 'def',
  '4': 'ghi',
  '5': 'jkl',
  '6': 'mno',
  '7': 'pqrs',
  '8': 'tuv',
  '9': 'wxyz'
}

function checkWord(word) {
  if (words.includes(word)) {
    return true;
  }
  return false;
}

function validateNumber(phoneNum) {
  const regLetters = /[a-zA-Z]/g;
  // Parses the initial country calling code and removes all spaces and dashes
  const parsedNum = phoneNum.slice(2).replace(/[' ']/g, '').replace(/[-]/g, '');
  let num;

  if ((parsedNum.length !== 10 && parsedNum.length !== 7) || regLetters.test(parsedNum)) {
    console.error('invalid number');
    return false;
  }

  parsedNum.length === 10 ? num = parsedNum.slice(3) : num = parsedNum.slice();

  if (num.includes('0') || num.includes('1')) {
    console.error('invalid number, cannot include 0 or 1');
    return false;
  }

  return num;
}

async function convertNumber(phoneNum) {
  const number = validateNumber(phoneNum);
  if (!number) {
    return;
  }
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

// Get three letter words from the first three digits, and four letter words from the last four digits
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

  // Create combinations of three letter and four letter words and add them to the vanity options
  // If there are no three letter word options, create vanity options from just four letter word options
  if (firstThreeToWords.length === 0) {
    for (let i = 0; i < lastFourToWords.length; i++) {
      vanityOptions.push(`${number[0]}${number[1]}${number[2]}-${lastFourToWords[i]}`.toUpperCase());
      if (vanityOptions.length >= 5) {
        return vanityOptions;
      }
    }
  } else {
    // For every three letter word option, add a four letter word option to create a vanity option
    for (let i = 0; i < firstThreeToWords.length; i++) {
      for (let j = 0; j < lastFourToWords.length; j++) {
        vanityOptions.push((firstThreeToWords[i] + lastFourToWords[j]).toUpperCase());
        if (vanityOptions.length >= 5) {
          return vanityOptions;
        }
      }
    }
    // If there are not yet five vanity options, add vanity options made of the first three digits and four letter word options
    for (let k = 0; k < lastFourToWords.length; k++) {
      vanityOptions.push(`${number[0]}${number[1]}${number[2]}-${lastFourToWords[k]}`.toUpperCase());
      if (vanityOptions.length >= 5) {
        return vanityOptions;
      }
    }
  }

  if (vanityOptions.length < 5) {
    return vanityOptions;
  }
}


module.exports = convertNumber;
