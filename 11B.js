// copy and paste this in the browser console at https://adventofcode.com/2020/day/11/input to get the solution

INPUT = $('pre')
  .textContent.split('\n')
  .slice(0, -1)
  .map(r => r.split(''));

// HELPERS
S = '#';
L = 'L';
E = '.'

getSeat = (input, rowIndex, colIndex) => {
  const row = input[rowIndex] || [];
  const cell = row[colIndex];
  return cell;
};

getFirstVisibleSeat = (input, row, dirI, col, dirJ) => {
  let i = 1;
  let seat = E;
  while (seat === E) {
    seat = getSeat(input, row + dirI * i, col + dirJ * i);
    i++;
  }
  return seat;
};

countVisibleOccupied = (input, row, col) => {
  let count = 0;
  if (getFirstVisibleSeat(input, row, -1, col, -1) === S) count++;
  if (getFirstVisibleSeat(input, row, -1, col, 0) === S) count++;
  if (getFirstVisibleSeat(input, row, -1, col, +1) === S) count++;
  if (getFirstVisibleSeat(input, row, 0, col, -1) === S) count++;
  if (getFirstVisibleSeat(input, row, 0, col, +1) === S) count++;
  if (getFirstVisibleSeat(input, row, +1, col, -1) === S) count++;
  if (getFirstVisibleSeat(input, row, +1, col, 0) === S) count++;
  if (getFirstVisibleSeat(input, row, +1, col, +1) === S) count++;
  return count;
};

runStep = CONFIG => {
  // clone
  const config = JSON.parse(JSON.stringify(CONFIG));

  // for each cell
  for (let i = 0; i < CONFIG.length; i++) {
    for (let j = 0; j < CONFIG[i].length; j++) {
      // if seat is occupied and 5 or more visible are occupied too, it becomes free
      if (getSeat(CONFIG, i, j) === S) {
        if (countVisibleOccupied(CONFIG, i, j) >= 5) {
          config[i][j] = L;
        }
      }

      // if seat is free and all the visible are free, it becomes occupied
      if (getSeat(CONFIG, i, j) === L) {
        if (countVisibleOccupied(CONFIG, i, j) === 0) {
          config[i][j] = S;
        }
      }
    }
  }
  return config;
};

countOccupiedSeatsOnceStable = input => {
  // clone
  let config = JSON.parse(JSON.stringify(input));
  let nextConfig;
  while (
    JSON.stringify((nextConfig = runStep(config))) !== JSON.stringify(config)
  ) {
    config = nextConfig;
  }

  // count the occupied seats once the config is stable
  return config.flat().filter(s => s === S).length;
};

countOccupiedSeatsOnceStable(INPUT);
