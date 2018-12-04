// Part One
let sleepEntries = require("fs").readFileSync("./d04-input.txt").toString().split("\n");
sleepEntries = sleepEntries.sort((a, b) => 
  new Date(a.slice(1).split('] ')[0]).getTime() - new Date(b.slice(1).split('] ')[0]).getTime()
);

let guardLogs = {};
let timeLogs = {};
let currentGuard = null;
let beganSleepingAt = null;

sleepEntries.forEach(entry => {
  const [datetime, info] = entry.slice(1).split('] ');
  const time = new Date(datetime);
  const args = info.split(' ');

  if (args[0] == 'Guard') {
    currentGuard = args[1];
    if (!timeLogs[currentGuard]) timeLogs[currentGuard] = [];
  } else if (args[0] === 'wakes') {
    guardLogs[currentGuard] = guardLogs[currentGuard] ? guardLogs[currentGuard] + (time - beganSleepingAt) : (time - beganSleepingAt);
    for (let i = 0; i < ((time - beganSleepingAt) / 60000); i++) {
      timeLogs[currentGuard].push((i+beganSleepingAt.getMinutes()) % 60);
    }
  } else if (args[0] === 'falls') {
    beganSleepingAt = time;
  }
});
const guardWithMostSleep = Object.entries(guardLogs).sort((a, b) => b[1] - a[1])[0];
console.log(guardWithMostSleep);

// Part 2
const guardMostMinutes = Object.entries(timeLogs).reduce((acc, value) => {
  const guard = value[0];
  const guardMinutes = timeLogs[guard].reduce((acc, value) => {
    acc[value] = acc[value] ?  acc[value] + 1 : 1;
    return acc;
  }, {});

  const minutes = Object.entries(guardMinutes).sort((a, b) => b[1] - a[1])[0];
  if (minutes != null) acc[guard] = minutes;
  return acc;
}, {});
console.log(guardMostMinutes);
