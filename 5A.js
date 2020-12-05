// copy and paste this in the browser console at https://adventofcode.com/2020/day/5/input to get the solution

// Parse input and strip extra line
seats = $('pre')
  .textContent.split('\n')
  .slice(0, -1)

// Replace Bs and Rs with ones and Fs and Ls with zeroes
// to get the binary representation of the seat id
  .map(s => s.replace(/B|R/g, 1).replace(/F|L/g, 0))
  .map(s => parseInt(s, 2));

// get the max
Math.max(...seats);
