(() => {
  const RAW_INPUT = $('pre').textContent.split('\n').slice(0, -1);

  // parse the input.
  // each line is a string like "swnenenenwewnenwsenwsenwnwnwnwnw"
  // it represents a path on a hexagonal grid.
  // we want to convert it to a list of directions.
  // Each direction is one of: e, se, sw, w, nw, ne

  const INPUT = RAW_INPUT.map(line => {
    const directions = [];
    let i = 0;
    while (i < line.length) {
      if (line[i] === 'e' || line[i] === 'w') {
        directions.push(line[i]);
        i++;
      } else {
        directions.push(line.slice(i, i + 2));
        i += 2;
      }
    }
    return directions;
  });

  // We need to walk through each path and figure out where it ends up (Considering we always start from the same reference hexagon)
  // When we end up in an hexagon, we flip its color from white to black or viceversa (All hexagons start white)

  // Finally, we county how many hexagons are black.

  // We can map the direction to a vector
  // e -> (1, 0)
  // w -> (-1, 0)
  // ne => (1/2, 1)
  // nw => (-1/2, 1)
  // se => (1/2, -1)
  // sw => (-1/2, -1)

  const TILES = INPUT.map(path => {
    let x = 0;
    let y = 0;
    path.forEach(direction => {
      switch (direction) {
        case 'e':
          x++;
          break;
        case 'w':
          x--;
          break;
        case 'ne':
          x += 0.5;
          y++;
          break;
        case 'nw':
          x -= 0.5;
          y++;
          break;
        case 'se':
          x += 0.5;
          y--;
          break;
        case 'sw':
          x -= 0.5;
          y--;
          break;
      }
    });
    return [x, y];
  });

  // Now, we want to know wich tiles are visited an odd number of times.
  // Let's construct a map TILE_ID => PARITY where TILE_ID is the stringified coordinates of the tile and PARITY is 0 or 1 depending on the parity of the number of times the tile is visited.

  const TILES_PARITY = TILES.reduce((acc, tile) => {
    const key = JSON.stringify(tile);
    acc[key] = ((acc[key] || 0) + 1) % 2;
    return acc;
  }, {});

  // Now we have to play a game similar to the Game of Life.
  // Every day, we flip the parity of some tiles following these rules:
  // - Any black tile with zero or more than 2 black tiles immediately adjacent to it is flipped to white.
  // - Any white tile with exactly 2 black tiles immediately adjacent to it is flipped to black.

  // Since we have a non-exhaustive list of tiles (we only have the black ones and some white ones where we have walked more than once, an even number of times), we need to construct a grid that contains all the tiles we know about.

  // We could take the minimum and maximum x and y coordinates and construct a grid with those dimensions and add 100 to each dimension to be sure we have all the tiles we need.
  // NB: The x coordinate is not an integer, so we need to use a map instead of an array.
  const TILES_GRID_AT_DAY_0 = (() => {
    let result = new Map();

    const xs = TILES.map(([x]) => x);
    const ys = TILES.map(([, y]) => y);
    const minX = Math.min(...xs) - 100;
    const maxX = Math.max(...xs) + 100;
    const minY = Math.min(...ys) - 100;
    const maxY = Math.max(...ys) + 100;

    for (let x = minX; x <= maxX; x = x + 0.5) {
      for (let y = minY; y <= maxY; y++) {
        const parity = TILES_PARITY[JSON.stringify([x, y])] ?? 0;
        result.set(JSON.stringify([x, y]), parity);
      }
    }

    return result;
  })();

  // Now let's write a function that takes a grid and returns the grid at the next day.

  const getAdjacentTiles = (grid, x, y) => {
    return [
      grid.get(JSON.stringify([x + 1, y])) ?? 0,
      grid.get(JSON.stringify([x - 1, y])) ?? 0,
      grid.get(JSON.stringify([x + 0.5, y + 1])) ?? 0,
      grid.get(JSON.stringify([x - 0.5, y + 1])) ?? 0,
      grid.get(JSON.stringify([x + 0.5, y - 1])) ?? 0,
      grid.get(JSON.stringify([x - 0.5, y - 1])) ?? 0,
    ];
  };

  const getNextTileParity = (grid, x, y) => {
    const adjacentTiles = getAdjacentTiles(grid, x, y);
    const adjacentBlackTiles = adjacentTiles.filter(x => x === 1).length;
    const parity = grid.get(JSON.stringify([x, y]));
    if (parity === 1) {
      if (adjacentBlackTiles === 0 || adjacentBlackTiles > 2) return 0;
      else return 1;
    } else {
      if (adjacentBlackTiles === 2) return 1;
      else return 0;
    }
  };

  const getNextGrid = grid => {
    const result = new Map();
    grid.forEach((parity, key) => {
      const [x, y] = JSON.parse(key);
      result.set(key, getNextTileParity(grid, x, y));
    });
    const numberOfBlacks = [...result.values()].filter(x => x === 1).length;
    console.log(numberOfBlacks);
    return result;
  };

  const TILES_AT_DAY_100 = (() => {
    let result = TILES_GRID_AT_DAY_0;
    for (let i = 1; i <= 100; i++) {
      console.log('DAY', i);
      result = getNextGrid(result);
    }
    return result;
  })();

  // Let's count the number of black tiles at day 100

  const BLACK_TILES = [...TILES_AT_DAY_100.values()].filter(
    x => x === 1,
  ).length;

  console.log(BLACK_TILES);
})();
