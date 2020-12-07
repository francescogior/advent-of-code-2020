// copy and paste this in the browser console at https://adventofcode.com/2020/day/6/input to get the solution

$('pre')
  .textContent // clean-up last newline char
  .slice(0, -1)

  // split in groups
  // of answers
  .split('\n\n')
  .map(
    group =>
      // calculate size of unions
      group
        .split('\n')
        .map(answer => answer.split(''))

        // perform the intersection of the answers on each group
        .reduce(intersection).length,
  )
  // sum them
  .reduce((a, b) => a + b);

// define an intersection function between arrays
function intersection(array1, array2) {
  const set = new Set();
  array1.forEach(el => {
    if (array2.indexOf(el) > -1) set.add(el);
  });

  return [...set];
}
