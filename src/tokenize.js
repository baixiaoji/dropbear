const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');

const tokenize = input => {
  const tokens = [];
  let cursor = 0;

  while (cursor < input.length) {
    const character = input[cursor];

    if (isParenthesis(character)) {
      tokens.push({
        type: 'Parenthesis',
        value: character,
      });
      cursor++;
      continue;
    }
    if (isQuote(character)) {
      let allString = '';

      while(!isQuote(input[++cursor])) {
        allString += input[cursor];
      }

      tokens.push({
        type: "String",
        value: allString,
      })
      cursor++;
      continue;
    }

    if (isLetter(character)) {
      let allNameString = character;
      while(isLetter(input[++cursor])) {
        allNameString += input[cursor];
      }

      tokens.push({
        type: 'Name',
        value: allNameString,
      })
    
      continue;
    }

    if (isNumber(character)) {
      let allNumberString = character;

      while(isNumber(input[++cursor])) {
        allNumberString += input[cursor];
      }
      tokens.push({
        type: 'Number',
        value: Number(allNumberString),
      })

      continue;
    }

  

    if (isWhitespace(character)) {
      cursor++;
      continue;
    }
  }

  return tokens;
};

module.exports = { tokenize };
