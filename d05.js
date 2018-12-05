// Part One
let polymer = require("fs").readFileSync("./d05-input.txt").toString();

const equalDiffCase = (a, b) => {
  return Math.abs(a.charCodeAt() - b.charCodeAt()) == 32;
};

const factor = (chars) => {
  for (let i = 0; i < chars.length - 1; i++) {
    if (equalDiffCase(chars[i], chars[i + 1])) {
      chars = [...chars.slice(0, i), ...chars.slice(i + 2)];
      i -= 2;
    }
    if (i < 0) i = -1;
  }
  return chars;
};
console.log(factor([...polymer]).length);

// Part two
let shortest = [...polymer].length;
const charTries = [...Array(26).keys()].map((c) => c + 65);

charTries.forEach((charTry) => {
  let replacedString = polymer.replace(new RegExp(String.fromCharCode(charTry), 'g'), '');
  replacedString = replacedString.replace(new RegExp(String.fromCharCode(charTry + 32), 'g'), '');
  const reducedPolyLength = factor([...replacedString]).length;
  if (reducedPolyLength < shortest) shortest = reducedPolyLength;
});
console.log(shortest);