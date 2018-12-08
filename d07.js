let graph = require("fs").readFileSync("./d07-input.txt").toString().split("\n").reduce((acc, value) => {
  const words = value.split(' ');
  const key = words[7];
  const dependent = words[1];
  if (!acc[dependent]) acc[dependent] = [];
  if (!acc[key]) acc[key] = [];
  acc[key].push(dependent);
  return acc;
}, {});

// Part One
let result = [];
let nextCandidates = [];

for (let i = 0; i < Object.keys(graph).length; i++) {
  if (i === 0) {
    nextCandidates = Object.keys(graph).filter(attr => graph[attr].length === 0);
  } else {
    const newCandidates = Object.keys(graph).filter(attr => {
      return graph[attr].filter(x => !result.includes(x)).length === 0;
    });
    nextCandidates = [...nextCandidates, ...newCandidates];
  }
  nextCandidates = nextCandidates.filter(x => !result.includes(x));
  result.push(nextCandidates.sort()[0]);
}
console.log(result.join(""));

// Part Two
let minimalStartTime = {};
result.forEach(val => {
  if (graph[val].length == 0) {
    minimalStartTime[val] = 0;
  } else {
    let min = 0;
    graph[val].forEach(letter => {
      const time = minimalStartTime[letter] + letter.charCodeAt() - 4;
      if (time > min) min = time;
    });
    minimalStartTime[val] = min;
  }
});

let workers = [{letter: null, time: 0}, {letter: null, time: 0}, {letter: null, time: 0}, {letter: null, time: 0}, {letter: null, time: 0}];
let completed = [];
let time = 0;

while(result.length != completed.length) {
  const inProgress = workers.map(worker => worker.letter);
  let readyToStart = Object.keys(minimalStartTime).filter(key => minimalStartTime[key] <= time);
  readyToStart = readyToStart.filter(x => !completed.includes(x));
  readyToStart = readyToStart.filter(x => !inProgress.includes(x)).sort();
  workers.forEach((worker, i) => {
    if (!worker.time) {
      if (readyToStart.length > 0) {
        workers[i].letter = readyToStart.shift();
        workers[i].time = workers[i].letter.charCodeAt() - 4;
        workers[i].time--;
        if (workers[i].time == 1) completed.push(workers[i].letter);
      }
    } else {
      if (workers[i].time == 1) completed.push(workers[i].letter);
      workers[i].time--;
    }
  });
  time++;
}
console.log(time);