
(() => {
  const INPUT = '326519478';
  const START = INPUT.split('').map(Number);

  const findDestinationIndex = config => {
    const current = config[0];
    const picked = config.slice(1, 4);

    let k = current - 1;
    let index = -1;
    while (index === -1 && k > 0) {
      if (!picked.includes(k)) index = config.indexOf(k);
      k--;
    }
    if (index === -1) {
      const max = Math.max(...config.slice(4));

      index = config.indexOf(max);
    }
    return index;
  };

  const run = (start, TIMES) => {
    let config = [...start];
    for (let i = 0; i < TIMES; i++) {
      const current = config[0];
      const picked = config.slice(1, 4);
      const destinationIndex = findDestinationIndex(config);
      config = [
        config[4],
        ...config.slice(5, destinationIndex + 1),
        ...picked,
        ...config.slice(destinationIndex + 1),
        config[0],
      ];
    }
    console.log('FINAL CONFIG', config);
    const indexOfOne = config.indexOf(1);
    return Number(
      config.slice(indexOfOne + 1).join('') +
        config.slice(0, indexOfOne).join(''),
    );
  };

  return run(START, 100);
})();
