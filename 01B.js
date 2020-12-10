// copy and paste this in the browser console at https://adventofcode.com/2020/day/1/input to get the solution

// parse input, remove extra line and transform to numbers
const list = $('pre')
  .textContent.split('\n')
  .slice(0, -1)
  .map(Number);

(function simpleButInefficient() {
  for (let i = 0; i < list.length; i++)
    for (let j = i + 1; j < list.length; j++)
      for (let k = i + 1; k < list.length; k++)
        if (list[i] + list[j] + list[k] === 2020) {
          return list[i] * list[j] * list[k];
        }
})();

// more efficient:
// parametrise the `moreEfficient` from https://github.com/francescogior/advent-of-code-2020/blob/main/1A.js
// for each item `n`, solve the previous problem with the list sliced after `n` and the target `2020 - n`

(function moreEfficient() {
  for (let i = 0; i < list.length; i++) {
    const n = list[i];
    const newTarget = 2020 - n;
    const newList = list.slice(i + 1);
    const tentative = solve1aEfficiently(newList, newTarget);
    if (tentative != null) return n * tentative;
  }
})();

function solve1aEfficiently(list, target) {
  const cache = new Set();
  for (const n of list) {
    const m = target - n;
    if (cache.has(m)) return m * n;
    else cache.add(n);
  }
}
