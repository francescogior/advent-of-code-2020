// copy and paste this in the browser console at https://adventofcode.com/2020/day/3/input to get the solution

// define some constants for convenience
TREE = '#';
SLOPE = [3, 1]

// parse input, remove extra line and transform to a matrix
PATH = $('pre')
  .textContent.split('\n')
  .slice(0, -1)
  .map(r => r.split(''));

// a position is a tuple [y, x]
// a move is a function that transforms a position in a new position
// the x position is calculated modulo the "width" of the path, since it repeats itself
// makeMove creates a move function given a slope [x, y] NB: x and y are inverted
makeMove = slope => position => [
  position[0] + slope[1],
  (position[1] + slope[0]) % PATH[0].length,
];

// the function to count the trees following a slope:
// - it creates a move function
// - it applies to move function until is possible
// - increment the trees count at each step
countTrees = slope => {
  const move = makeMove(slope);
  let treesCount = 0;
  let position = [0, 0];
  while (true) {
    position = move(position);
    if (PATH[position[0]] == null) break;
    if (PATH[position[0]][position[1]] === TREE) treesCount++;
  }
  return treesCount;
};

countTrees(SLOPE);
