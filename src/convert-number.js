// create a function to convert a phone number to vanity number options
// create an object representing the numbers and corresponding letters on a phone
// create seven letter words from the phone number
  // check if the word is an actual word, using wordsapi.com
// import fetch from "node-fetch";
// import words from 'an-array-of-english-words';
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

function validateNumber(phoneNum) {
  const regLetters = /[a-zA-Z]/g;
  const parsedNum = phoneNum.replace(/[' ']/g, '').replace(/[-]/g, '');
  let num;

  if ((parsedNum.length !== 10 && parsedNum.length !== 7) || regLetters.test(parsedNum)) {
    console.error('invalid number');
    return;
  }

  parsedNum.length === 10 ? num = parsedNum.slice(3) : num = parsedNum.slice();
  return num;
}

function convertNumber(phoneNum) {
  const number = validateNumber(phoneNum);

  const vanityOptions = [];
  const firstLetterOptions = keypad[number[0]];
  const secondLetterOptions = keypad[number[1]];
  const thirdLetterOptions = keypad[number[2]];
  const fourthLetterOptions = keypad[number[3]];
  const fifthLetterOptions = keypad[number[4]];
  const sixthLetterOptions = keypad[number[5]];
  const seventhLetterOptions = keypad[number[6]];

  // Get 7 letter words from a phone number
  for (let firstIndex = 0; firstIndex < firstLetterOptions.length; firstIndex++) {
    for (let secondIndex = 0; secondIndex < secondLetterOptions.length; secondIndex++) {
      for (let thirdIndex = 0; thirdIndex < thirdLetterOptions.length; thirdIndex++) {
        for (let fourthIndex = 0; fourthIndex < fourthLetterOptions.length; fourthIndex++) {
          for (let fifthIndex = 0; fifthIndex < fifthLetterOptions.length; fifthIndex++) {
            for (let sixthIndex = 0; sixthIndex < sixthLetterOptions.length; sixthIndex++) {
              for (let seventhIndex = 0; seventhIndex < seventhLetterOptions.length; seventhIndex++) {
                const currWord = firstLetterOptions[firstIndex] + secondLetterOptions[secondIndex] + thirdLetterOptions[thirdIndex]
                  + fourthLetterOptions[fourthIndex] + fifthLetterOptions[fifthIndex] + sixthLetterOptions[sixthIndex] + seventhLetterOptions[seventhIndex];
                if (vanityOptions.length >= 5) {
                  console.log('vanity options', vanityOptions);
                  return;
                }
                if (checkWord(currWord)) {
                  vanityOptions.push(currWord);
                }
              }
            }
          }
        }
      }
    }
  }
  const firstThreeToWords = [];
  const lastFourToWords = [];

  // If there are less than 5 vanityOptions, get 3 letter words and 4 letter words
  if (vanityOptions.length < 5) {
    for (let firstIndex = 0; firstIndex < firstLetterOptions.length; firstIndex++) {
      for (let secondIndex = 0; secondIndex < secondLetterOptions.length; secondIndex++) {
        for (let thirdIndex = 0; thirdIndex < thirdLetterOptions.length; thirdIndex++) {
          const currWord = firstLetterOptions[firstIndex] + secondLetterOptions[secondIndex] + thirdLetterOptions[thirdIndex];
          // Check if the three letter combination is a word, and only add the three letter word if the number of options is less than the remaining options needed for vanityOptions
          if (checkWord(currWord) && firstThreeToWords.length < 5 - vanityOptions.length) {
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
            if (checkWord(currWord) && lastFourToWords.length < 5 - vanityOptions.length) {
              lastFourToWords.push(currWord);
            }
          }
        }
      }
    }
  }


  if (vanityOptions.length < 5) {
    console.log('these are all the matches');
  }
  console.log('all words', vanityOptions);
  console.log('three letters words', firstThreeToWords);
  console.log('four letter words', lastFourToWords)
}

function checkWord(word) {
  if (words.includes(word)) {
    return true;
  }
  return false;
}

convertNumber('2845337');
