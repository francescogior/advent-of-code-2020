// copy and paste this in the browser console at https://adventofcode.com/2020/day/11/input to get the solution


INPUT = $('pre')
  .textContent.split('\n')
  .slice(0, -1)
  .map(r => r.split(''));

// HELPERS
S = '#';
L = 'L';

getSeat = (input, rowIndex, colIndex) => {
  const row = input[rowIndex] || [];
  const cell = row[colIndex];
  return cell;
};

countAdjacendOccupied = (input, row, col) => {
  let count = 0;
  if (getSeat(input, row - 1, col - 1) === S) count++;
  if (getSeat(input, row - 1, col) === S) count++;
  if (getSeat(input, row - 1, col + 1) === S) count++;
  if (getSeat(input, row, col - 1) === S) count++;
  if (getSeat(input, row, col + 1) === S) count++;
  if (getSeat(input, row + 1, col - 1) === S) count++;
  if (getSeat(input, row + 1, col) === S) count++;
  if (getSeat(input, row + 1, col + 1) === S) count++;
  return count;
};



runStep = CONFIG => {
  // clone
  const config = JSON.parse(JSON.stringify(CONFIG));
  
  // for each cell
  for (let i = 0; i < CONFIG.length; i++) {
    for (let j = 0; j < CONFIG[i].length; j++) {
    
      // if seat is occupied and 4 or more adjacents are occupied too, it becomes free
      if (getSeat(CONFIG, i, j) === S) {
        if (countAdjacendOccupied(CONFIG, i, j) >= 4) {
          config[i][j] = L;
        }
      }
      
      // if seat is free and all the adjacents are free, it becomes occupied
      if (getSeat(CONFIG, i, j) === L) {
        if (countAdjacendOccupied(CONFIG, i, j) === 0) {
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

countOccupiedSeatsOnceStable(INPUT)
