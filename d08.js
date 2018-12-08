// Part One
const nodes = require('fs').readFileSync('./d08-input.txt').toString().split(' ');

const sumNodes = () => {
  const childNodeCount = Number(nodes.shift());
  const metaDataCount = Number(nodes.shift());
  let total = 0;

  for (let i = 0; i < childNodeCount; i++) {
    total += sumNodes();
  }

  for (let i = 0; i < metaDataCount; i++) {
    total += Number(nodes.shift());
  }

  return total;
};

console.log(sumNodes());

// Part Two
const nodesTwo = require('fs').readFileSync('./d08-input.txt').toString().split(' ');

const rootNodeValue = () => {
  const childNodeCount = Number(nodesTwo.shift());
  const metaDataCount = Number(nodesTwo.shift());

  if (childNodeCount === 0) {
    let value = 0;
    for (let i = 0; i < metaDataCount; i++) {
      value += Number(nodesTwo.shift());
    }

    return value;
  } else {
    const childs = [];
    for (let i = 0; i < childNodeCount; i++) {
      childs.push(rootNodeValue());
    }

    const metadatas = [];
    for (let i = 0; i < metaDataCount; i++) {
      metadatas.push(Number(nodesTwo.shift()));
    }

    let total = 0;
    metadatas.forEach(metadata => {
      const referenceIndex = metadata - 1;
      if (childs[referenceIndex] != null) {
        total += childs[referenceIndex];
      }
    });

    return total;
  }
};

console.log(rootNodeValue());