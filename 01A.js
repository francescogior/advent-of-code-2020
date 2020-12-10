
// copy and paste this in the browser console at https://adventofcode.com/2020/day/1/input to get the solution

// parse input, remove extra line and transform to numbers
const list = $('pre')
  .textContent.split('\n')
  .slice(0, -1)
  .map(Number);

// simple but not efficient
(function simpleButInefficient() {
  for (let i = 0; i < list.length; i++)
    for (let j = i + 1; j < list.length; j++)
      if (list[i] + list[j] === 2020) {
        return list[i] * list[j];
      }
})();

// more efficient
(function moreEfficient() {
  const cache = new Set();
  for (const n of list) {
    const m = 2020 - n;
    if (cache.has(m)) return m * n;
    else cache.add(n);
  }
})();
