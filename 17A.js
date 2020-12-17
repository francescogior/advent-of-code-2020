// copy and paste this code to https://adventofcode.com/2020/day/17/input to get the result
// IT MAY TAKE SEVERAL SECONDS OR MINUTES

(() => {
  const INPUT = $('pre')
    .textContent.split('\n')
    .slice(0, -1);
  //   const EXAMPLE_INPUT = `.#.
  // ..#
  // ###`.split('\n');
  // const INITIAL_STATE_EXAMPLE = {
  //   '0': EXAMPLE_INPUT.map(row => row.split('')),
  // };
  const INITIAL_STATE = { '0': INPUT.map(row => row.split('')) };
  const ACTIVE = '#';
  const INACTIVE = '.';
  const getCell = (config, x, y, z) => {
    return config?.[z]?.[y]?.[x] ?? INACTIVE;
  };

  const setCell = (config, x, y, z, status) => {
    let newConfig = JSON.parse(JSON.stringify({ ...config }));
    newConfig[z] = newConfig[z] ?? {};
    newConfig[z][y] = newConfig[z][y] ?? {};
    newConfig[z][y][x] = status;
    return newConfig;
  };

  const getNeighboursCoord = (x, y, z) => {
    let result = [];
    for (let i = -1; i <= 1; i++)
      for (let j = -1; j <= 1; j++)
        for (let k = -1; k <= 1; k++)
          if (!(i === 0 && j === 0 && k === 0))
            result.push([x + i, y + j, z + k]);
    return result;
  };
  const countActiveNeighbours = (config, x, y, z) => {
    return getNeighboursCoord(x, y, z)
      .map(coor => getCell(config, ...coor))
      .reduce((acc, cellState) => acc + (cellState === ACTIVE ? 1 : 0), 0);
  };

  const getNextState = (currentState, numberOfActiveNeighbours) =>
    currentState === ACTIVE
      ? [2, 3].includes(numberOfActiveNeighbours)
        ? ACTIVE
        : INACTIVE
      : numberOfActiveNeighbours === 3
      ? ACTIVE
      : INACTIVE;

  const getNextStep = config => {
    let nextConfig = {};
    for (let k = -6; k <= 6; k++)
      for (let j = -6; j <= 14; j++)
        for (let i = -6; i <= 14; i++) {
          const currentState = getCell(config, i, j, k);
          const activeNeighbours = countActiveNeighbours(config, i, j, k);
          const nextState = getNextState(currentState, activeNeighbours);
          nextConfig = setCell(nextConfig, i, j, k, nextState);
        }
    return nextConfig;
  };

  const countActive = config => {
    let count = 0;
    for (let k = -6; k <= 6; k++)
      for (let j = -6; j <= 14; j++)
        for (let i = -6; i <= 14; i++) {
          if (getCell(config, i, j, k) === ACTIVE) count++;
        }
    return count;
  };

  const run = config => {
    let currentConfig = JSON.parse(JSON.stringify(config));
    for (let i = 1; i <= 6; i++) {
      currentConfig = getNextStep(currentConfig);
    }
    return countActive(currentConfig);
  };

  run(INITIAL_STATE);
})();
