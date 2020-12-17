// @flow
// copy and paste this code to https://adventofcode.com/2020/day/17/input to get the result

(() => {
  const EXAMPLE = false;

  const INPUT = $('pre')
    .textContent.split('\n')
    .slice(0, -1);
  const EXAMPLE_INPUT = `.#.
..#
###`.split('\n');
  const INITIAL_STATE_EXAMPLE = {
    '0': {
      '0': EXAMPLE_INPUT.map(row => row.split('')),
    },
  };
  const INITIAL_STATE = EXAMPLE
    ? INITIAL_STATE_EXAMPLE
    : { '0': { '0': INPUT.map(row => row.split('')) } };
  const ACTIVE = '#';
  const INACTIVE = '.';

  const getCell = (config, x, y, z, w) => {
    return config?.[w]?.[z]?.[y]?.[x] ?? INACTIVE;
  };

  const setCell = (config, x, y, z, w, status) => {
    return {
      ...config,
      [w]: {
        ...config[w],
        [z]: {
          ...config[w]?.[z],
          [y]: {
            ...config[w]?.[z]?.[y],
            [x]: status,
          },
        },
      },
    };
  };

  const getNeighboursCoord = (x, y, z, w) => {
    let result = [];
    for (let i = -1; i <= 1; i++)
      for (let j = -1; j <= 1; j++)
        for (let k = -1; k <= 1; k++)
          for (let l = -1; l <= 1; l++)
            if (!(i === 0 && j === 0 && k === 0 && l === 0))
              result.push([x + i, y + j, z + k, w + l]);
    return result;
  };
  const countActiveNeighbours = (config, x, y, z, w) => {
    return getNeighboursCoord(x, y, z, w)
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

  const getNextConfig = (config, step) => {
    const size = INITIAL_STATE[0][0].length;
    let nextConfig = {};
    for (let l = -step; l <= step; l++)
      for (let k = -step; k <= step; k++)
        for (let j = -step; j <= size + step; j++)
          for (let i = -step; i <= size + step; i++) {
            const currentState = getCell(config, i, j, k, l);
            const activeNeighbours = countActiveNeighbours(config, i, j, k, l);
            const nextState = getNextState(currentState, activeNeighbours);
            nextConfig = setCell(nextConfig, i, j, k, l, nextState);
          }
    return nextConfig;
  };

  const countActive = config => {
    let count = 0;
    for (let l = -6; l <= 6; l++)
      for (let k = -6; k <= 6; k++)
        for (let j = -6; j <= 14; j++)
          for (let i = -6; i <= 14; i++) {
            if (getCell(config, i, j, k, l) === ACTIVE) count++;
          }
    return count;
  };

  const range = (start, endIncluded) => {
    let result = [];
    for (let i = start; i <= endIncluded; i++) {
      result.push(i);
    }
    return result;
  };

  const run = (config, times) => {
    return countActive(range(1, times).reduce(getNextConfig, config));
  };

  return run(INITIAL_STATE, 6);
})();
