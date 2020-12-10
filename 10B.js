// copy and paste this in the browser console at https://adventofcode.com/2020/day/10/input to get the solution

DATA = $('pre')
  .textContent.split('\n')
  .slice(0, -1)
  .map(Number);

[...DATA]
  .sort((a, b) => a - b)
  .map((a, index, list) => a - (list[index - 1] || 0))
  .concat(3)

  // let's produce an array with the streaks lenghts of `1`s
  .reduce(
    (acc, a) => ({
      curr: a === 1 ? acc.curr + 1 : 0,
      list: a === 1 ? acc.list : acc.list.concat(acc.curr),
    }),
    { curr: 0, list: [] },
  )
  .list 
  
  // if there are two consecutive ones, we have 2 choices
  // if there are three consecutive ones, we have 4 choices
  // if there are four consecutive ones, we have 7 choices
  .map(a =>
    a === 0 ? 1 : a === 1 ? 1 : a === 2 ? 2 : a === 3 ? 4 : a === 4 ? 7 : null,
  )

  // get the product
  .reduce((a, b) => a * b);
