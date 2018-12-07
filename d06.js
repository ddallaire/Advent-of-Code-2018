// Part One
const points = require("fs").readFileSync("./d06-input.txt").toString().split("\n").map((point) => {
  const coords = point.split(', ');
  return {
    x: Number(coords[0]),
    y: Number(coords[1])
  };
});
const offset = 500;

const manhattanDist = (a, b) => {
  return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
}

const leftMost = Math.min(...points.map((point) => point.x)) - offset;
const rightMost = Math.max(...points.map((point) => point.x)) + offset;
const topMost = Math.min(...points.map((point) => point.y)) - offset;
const bottomMost = Math.max(...points.map((point) => point.y)) + offset;

let distances = []

for (let x = leftMost; x <= rightMost; x++) {
  for (let y = topMost; y <= bottomMost; y++) {
    const allDistances = points.map((point) => {
      return {
        point,
        dist: manhattanDist(point, {x, y})
      };
    });

    const minDistance = allDistances.sort((a, b) => a.dist - b.dist)[0];
    const minDistanceCount = allDistances.filter((distance) => distance.dist === minDistance.dist).length;
    if (minDistanceCount === 1) {
      distances.push(minDistance);
    }
  }
}

let distancesWithoutInfinites = [];
for (let i = 0; i < distances.length; i++) {
  const x = distances[i].point.x;
  const y = distances[i].point.y;
  if (x > leftMost + offset && x < rightMost - offset && y > topMost + offset && y < bottomMost - offset) {
    distancesWithoutInfinites.push(distances[i]);
  }
}

const countByPoint = distancesWithoutInfinites.reduce((acc, distance) => {
  const key = `${distance.point.x},${distance.point.y}`;
  acc[key] = acc[key] ? acc[key] + 1 : 1;
  return acc;
}, {});
console.log(countByPoint);

// Part Two
let totalInArea = 0;
for (let x = leftMost; x <= rightMost; x++) {
  for (let y = topMost; y <= bottomMost; y++) {
    let size = 0;
    points.forEach((point) => {
      size += manhattanDist(point, {x, y});
    });

    if (size < 10000) totalInArea++;
  }
}

console.log(totalInArea);