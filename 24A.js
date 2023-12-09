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

  // Finally, we count the number of tiles with parity 1

  const BLACK_TILES = Object.values(TILES_PARITY).filter(x => x === 1).length;

  console.log(BLACK_TILES);
})();
