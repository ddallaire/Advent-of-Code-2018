// Part One
const boxIds = require("fs").readFileSync("./d02-input.txt").toString().split("\n");
let twos = 0;
let threes = 0;

boxIds.forEach((boxId) => {
  let charMap = new Map();
  [...boxId].forEach((char) => {
    const count = charMap.has(char) ? charMap.get(char) + 1 : 1;
    charMap.set(char, count);
  });

  if (Array.from(charMap.keys()).some((key) => charMap.get(key) === 2)) twos++;
  if (Array.from(charMap.keys()).some((key) => charMap.get(key) === 3)) threes++;
});
console.log(twos*threes);

// Part Two
let result;
for (let i = 0; i < boxIds.length; i++) {
  for (let j = i + 1; j < boxIds.length; j++) {
    const iBoxIdChars = [...boxIds[i]];
    const jBoxIdChars = [...boxIds[j]];
    const diff = iBoxIdChars.reduce((accumulator, boxId, index) => accumulator + (boxId === jBoxIdChars[index] ? 0 : 1), 0);

    if (diff === 1) {
      result = iBoxIdChars.filter(value => jBoxIdChars.includes(value)).join("");
    }
  }
}
console.log(result);
