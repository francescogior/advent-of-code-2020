// copy and paste this in the browser console at https://adventofcode.com/2020/day/9/input to get the solution

DATA = $('pre')
  .textContent.split('\n')
  .slice(0, -1)
  .map(Number);

PREAMBLE_LENGTH = 25;

getValidOptions = subset => {
  result = [];
  for (let i = 0; i < subset.length; i++) {
    for (let j = i + 1; j < subset.length; j++) {
      result.push(subset[i] + subset[j]);
    }
  }
  return result;
};

findFirstInvalid = (data, preambleLength) => {
  let cursor = preambleLength;
  let valids = getValidOptions(data.slice(cursor - preambleLength, cursor));
  while (cursor < data.length && valids.includes(data[cursor])) {
    cursor++;
    valids = getValidOptions(data.slice(cursor - preambleLength, cursor));
  }

  return data[cursor];
};

TARGET = findFirstInvalid(DATA, PREAMBLE_LENGTH);

findSetThatSumsTo = (data, target) => {
  for (let i = 0; i < data.length; i++) {
    for (let j = 2; i + j < data.length; j++) {
      const set = data.slice(i, i + j);
      const sum = set.reduce((a, b) => a + b);
      if (sum === target) {
        const min = Math.min(...set);
        const max = Math.max(...set);
        return min + max;
      }
    }
  }
};

findSetThatSumsTo(DATA, TARGET);
