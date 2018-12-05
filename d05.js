// Part One
let polymer = require("fs").readFileSync("./d05-input.txt").toString();

let chars = [...polymer];

const equalDiffCase = (a, b) => {
  return Math.abs(a.charCodeAt() - b.charCodeAt()) == 32;
};

for (let i = 0; i < chars.length - 1; i++) {
  if (equalDiffCase(chars[i], chars[i + 1])) {
    chars = [...chars.slice(0, i), ...chars.slice(i + 2)];
    i -= 2;
  }
  if (i < 0) i = -1;
}
console.log(chars.length);