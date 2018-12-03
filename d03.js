// Part One
const matDefinitions = require("fs").readFileSync("./d03-input.txt").toString().split("\n");
let grid = {};

matDefinitions.forEach(mat => {
  [id, at, location, size] = mat.split(' ');
  [left, top] = location.slice(0, -1).split(',').map(num => Number(num));
  [width, height] = size.split('x').map(num => Number(num));

  for (let i = left; i < left + width; i++) {
		for (let j = top; j < top + height; j++) {
      const index = i + 1000 * j;
      grid[index] = grid[index] ? grid[index] + 1 : 1;
		}
	}
});
const result = Object.values(grid).filter(cell => cell > 1).length;
console.log(result);

// Part Two
let loner = null;
matDefinitions.forEach(mat => {
  let isLoner = true;
  [id, at, location, size] = mat.split(' ');
  [left, top] = location.slice(0, -1).split(',').map(num => Number(num));
  [width, height] = size.split('x').map(num => Number(num));
  
  for (let i = left; i < left + width; i++) {
		for (let j = top; j < top + height; j++) {
      const index = i + 1000 * j;
      if (grid[index] !== 1) isLoner = false;
		}
  }
  
  if (isLoner) loner = id;
});
console.log(loner);
