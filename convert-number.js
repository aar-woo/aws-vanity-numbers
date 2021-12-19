// create a function to convert a phone number to vanity number options
// create an object representing the numbers and corresponding letters on a phone
// create seven letter words from the phone number
  // check if the word is an actual word, using wordsapi.com
const keypad = {
  '0': null,
  '1': null,
  '2': 'ABC',
  '3': 'DEF',
  '4': 'GHI',
  '5': 'JKL',
  '6': 'MNO',
  '7': 'PQRS',
  '8': 'TUV',
  '9': 'WXYZ'
}

function convertNumber(phoneNum) {
  const regLetters = /[a-zA-Z]/g;
  const parsedNum = phoneNum.replace(/[' ']/g, '').replace(/[-]/g,'');
  if (parsedNum.length !== 10 || regLetters.test(parsedNum)) {
    console.error('invalid number');
  }
  const num = parsedNum.slice(3);

  const allWords = [];
  const firstLetterOptions = keypad[num[0]];
  const secondLetterOptions = keypad[num[1]];
  const thirdLetterOptions = keypad[num[2]];
  const fourthLetterOptions = keypad[num[3]];
  const fifthLetterOptions = keypad[num[4]];
  const sixthLetterOptions = keypad[num[5]];
  const seventhLetterOptions = keypad[num[6]];



  for (let firstIndex = 0; firstIndex < firstLetterOptions.length; firstIndex++) {
    for (let secondIndex = 0; secondIndex < secondLetterOptions.length; secondIndex++) {
      for (let thirdIndex = 0; thirdIndex < thirdLetterOptions.length; thirdIndex++) {
        for (let fourthIndex = 0; fourthIndex < fourthLetterOptions.length; fourthIndex++) {
          for (let fifthIndex = 0; fifthIndex < fifthLetterOptions.length; fifthIndex++) {
            for (let sixthIndex = 0; sixthIndex < sixthLetterOptions.length; sixthIndex++) {
              for (let seventhIndex = 0; seventhIndex < seventhLetterOptions.length; seventhIndex++) {
                const currWord = firstLetterOptions[firstIndex] + secondLetterOptions[secondIndex] + thirdLetterOptions[thirdIndex]
                + fourthLetterOptions[fourthIndex] + fifthLetterOptions[fifthIndex] + sixthLetterOptions[sixthIndex] + seventhLetterOptions[seventhIndex];
                allWords.push(currWord);
              }
            }
          }
        }
      }
    }
  }
  console.log('all words', allWords)
}

convertNumber('808-234-4426');

//


// Recursion
// function getAllWords(phoneNum, curr, output) {
//   if (curr === 3) {
//     console.log('output', output);
//     return;
//   }
//   let digit = phoneNum[0];
//   for (let i = 0; i < phoneNum[digit].length; i++) {
//     output.push(keypad[digit][curr]);
//   }
//   return keypad[digit][curr] + getAllWords(phoneNum, curr + 1);
//   console.log('currword', currWord)


// }

// getAllWords('4', 0);
