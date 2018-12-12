// Part One and Two (*100)
const players = 426;
const marbles = 72058;

let playerScores = new Array(players).fill(0);

const addAfter = (value, marble) => {
    const toAdd = {
        value,
        prev: marble,
        next: marble.next,
    };
    marble.next.prev = toAdd;
    marble.next = toAdd;
    return toAdd;
};

const scores = {};
for (let i = 1; i <= players; i += 1) {
    scores[i] = 0;
}
let currentPlayer = 1;

let current = {
    value: 0,
};
current.next = current;
current.prev = current;

for (let m = 1; m <= marbles * 100; m += 1) {
    if (m % 23 === 0) {
        scores[currentPlayer] += m;
        current = current.prev.prev.prev.prev.prev.prev;
        scores[currentPlayer] += current.prev.value;
        current.prev.prev.next = current;
        current.prev = current.prev.prev;
    } else {
        current = addAfter(m, current.next);
    }
    currentPlayer = currentPlayer % players + 1;
}
console.log(Math.max(...Object.values(scores)));