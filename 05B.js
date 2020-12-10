// copy and paste this in the browser console at https://adventofcode.com/2020/day/5/input to get the solution

// Parse input and strip extra line
seats = $('pre')
  .textContent.split('\n')
  .slice(0, -1)

  // Replace Bs and Rs with ones and Fs and Ls with zeroes
  // to get the binary representation of the seat id
  .map(s => s.replace(/B|R/g, 1).replace(/F|L/g, 0))
  .map(s => parseInt(s, 2));

// To find the missing seat in the unsorted list
// we can get the difference between the sum of all the seats
// and the sum of the consecutive integer from the minimum and the maximum
// The formula of the consecutive integer from A to B is (A+B)(A-B+1)/2
max = Math.max(...seats);
min = Math.min(...seats);
((max + min) * (max - min + 1)) / 2 - seats.reduce((a, b) => a + b);
