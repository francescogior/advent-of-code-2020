// copy and paste this in the browser console at https://adventofcode.com/2020/day/6/input to get the solution

$('pre')
  .textContent
  
  // clean-up last newline char
  .slice(0, -1)

  // split in groups
  // of answers
  .split('\n\n')
  .map(
    group =>
      group
        .split('\n')
        .map(answer => answer.split(''))
        
        // perform the union of the answers on each group
        .reduce(intersection)
        // calculate size of unions
        .length,
  )
  // sum them
  .reduce((a, b) => a + b);

// define a union function between arrays
function union(array1, array2) {
  const set = new Set();
  array1.forEach(el => {
    set.add(el);
  });
  array2.forEach(el => {
    set.add(el);
  });
  return [...set];
}

