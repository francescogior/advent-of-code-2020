// @flow

(() => {
  const INPUT = $('pre')
    .textContent.split('\n\n')
    .slice(0, -1);
  const TILES = INPUT.reduce(
    (acc, tileBlob) => ({
      ...acc,
      [tileBlob.split(':')[0].split(' ')[1]]: tileBlob
        .split('\n')
        .slice(1)
        .map(row => row.split('')),
    }),
    {},
  );

  const getEdges = tile => {
    return {
      top: tile[0].join(''),
      bottom: tile[9].join(''),
      left: tile.map(r => r[0]).join(''),
      right: tile.map(r => r[9]).join(''),
    };
  };

  const findNeighbour = (tileId, TILES, side) => {
    const { [side]: edge } = getEdges(TILES[tileId]);

    for (const otherTileId of Object.keys(TILES)) {
      if (otherTileId !== tileId) {
        const edges = getEdges(TILES[otherTileId]);
        if (edge === edges.top) return [otherTileId, 'top'];
        if (edge === edges.bottom) return [otherTileId, 'bottom'];
        if (edge === edges.left) return [otherTileId, 'left'];
        if (edge === edges.right) return [otherTileId, 'right'];
        if (
          edge ===
          edges.top
            .split('')
            .reverse()
            .join('')
        )
          return [otherTileId, 'top reverse'];
        if (
          edge ===
          edges.bottom
            .split('')
            .reverse()
            .join('')
        )
          return [otherTileId, 'bottom reverse'];
        if (
          edge ===
          edges.left
            .split('')
            .reverse()
            .join('')
        )
          return [otherTileId, 'left reverse'];
        if (
          edge ===
          edges.right
            .split('')
            .reverse()
            .join('')
        )
          return [otherTileId, 'right reverse'];
      }
    }
  };

  const findCorners = TILES => {
    let corners = [];
    for (const id in TILES) {
      if (findNeighbour(id, TILES, 'bottom') == null) {
        if (
          findNeighbour(id, TILES, 'right') == null ||
          findNeighbour(id, TILES, 'left') == null
        ) {
          corners.push(id);
        }
      }
      if (findNeighbour(id, TILES, 'top') == null) {
        if (
          findNeighbour(id, TILES, 'right') == null ||
          findNeighbour(id, TILES, 'left') == null
        ) {
          corners.push(id);
        }
      }
    }
    return corners;
  };

  const prod = (a, b) => a * b;

  return findCorners(TILES)
    .map(Number)
    .reduce(prod);
})();
