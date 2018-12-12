// Part One
const input = 7139;
let grid = [];

for (let x = 0; x < 300; x++) {
  grid[x] = [];
  const rackId = x + 10;
  for (let y = 0; y < 300; y++) {
    let powerLevel = rackId * y;
    powerLevel += input;
    powerLevel *= rackId;
    powerLevel = Math.floor((powerLevel / 100) % 10)
    powerLevel -= 5;
    grid[x][y] = powerLevel;
  }
}

let max = Number.MIN_VALUE;
let xMax = -1;
let yMax = -1;
for (var x = 0; x < 298; x++) {
  for (var y = 0; y < 298; y++) {
    let currentPower = 0;
    for (var row = x; row < x + 3; row++) {
      for (var col = y; col < y + 3; col++) {
        currentPower += grid[row][col];
      }
    }
    if (currentPower > max) {
      xMax = x;
      yMax = y;
    }
  }
}
console.log(`${xMax},${yMax}`);

// Part Two
max = {
  x: -1,
  y: -1,
  power: 0,
  size: 0
}

for (let size = 1; size < 25; size++) {
  for (let x = 1; x < 301 - size; x++) {
    for (let y = 1; y < 301 - size; y++) {
      let currentPower = 0;
      for (let row = x - 1; row <  x - 1 + size; row++) {
        for (let col = y - 1; col < y - 1 + size; col++) {
          currentPower += grid[row][col];
        }
      }
      if (currentPower > max.power) {
        max = {
          x: x - 1,
          y: y - 1,
          power: currentPower,
          size
        };
      }
    }
  }
}
console.log(`${max.x},${max.y},${max.size}`);
