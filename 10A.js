
// copy and paste this in the browser console at https://adventofcode.com/2020/day/10/input to get the solution

DATA = $('pre')
  .textContent.split('\n')
  .slice(0, -1)
  .map(Number);

diffs = [...DATA]
  .sort((a, b) => a - b)
  .map((a, index, list) => a - (list[index - 1] || 0))
  .concat(3)
  .reduce(
    (acc, a) => ({
      ones: acc.ones + (a === 1 ? +1 : 0),
      threes: acc.threes + (a === 3 ? 1 : 0),
    }),
    { ones: 0, threes: 0 },
  );

diffs.ones * diffs.threes;
