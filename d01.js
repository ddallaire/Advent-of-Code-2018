// Part One
const inputs = require('fs').readFileSync("./d01-input.txt").toString();
const lines = inputs.split("\n");
const result = lines.reduce((a, b) => a + parseInt(b, 10), 0);
console.log(result);

// Part two
let i = 0;
let currentFrequency = 0;
let resultFrenquencies = [currentFrequency];
let match = false;
while (!match) {
  currentFrequency = currentFrequency + parseInt(lines[i], 10);
  match = resultFrenquencies.includes(currentFrequency);
  resultFrenquencies.push(currentFrequency);
  i = (i + 1) % lines.length;
}
console.log(currentFrequency);