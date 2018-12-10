// Part One
const points = require('fs').readFileSync('d10-input.txt').toString().split('\n').map(line => {
  const matched = line.match(/position=< ?(-?\d+),  ?(-?\d+)> velocity=< ?(-?\d+),  ?(-?\d+)>/);
  return { 
    x: Number(matched[1]),
    y: Number(matched[2]),
    velocityX: Number(matched[3]),
    velocityY: Number(matched[4]) 
  };
});

let min = Number.MAX_VALUE;
let i = 0;
while (true) {
  let max = Number.MIN_VALUE;
  points.forEach(point => {
    point.x += point.velocityX;
    point.y += point.velocityY;
    if (Math.abs(point.y) > max) {
      max = Math.abs(point.y);
    }
  });

  if (max < min) {
    min = max;
  } else {
    points.forEach(point => {
      point.x -= point.velocityX;
      point.y -= point.velocityY;
    });
    break;
  };
  i++
}

let minX = Number.MAX_VALUE;
let minY = Number.MAX_VALUE;
let maxX = Number.MIN_VALUE;
let maxY = Number.MIN_VALUE;

points.forEach(point => {
  if (point.x < minX) minX = point.x;
  if (point.y < minY) minY = point.y;
  if (point.x > maxX) maxX = point.x;
  if (point.y > maxY) maxY = point.y;
});

let grid = [];

let totalX = Math.abs(maxX) + 2;
let totalY = Math.abs(maxY) + 2;

for (let i = 0; i < totalY; i++) {
    grid.push([]);
    for (let j = 0; j < totalX; j++) {
      grid[i].push('.');
    }
}

points.forEach(point => grid[point.y][point.x] = '#');

if (minY > 0) grid = grid.slice(minY - 1);
if (minX > 0) grid = grid.map(arr => arr.slice(minX - 1));

let string = '';

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    string += grid[i][j];
  }
  string += '\n';
}

console.log(string);
// Part Two
console.log(i);