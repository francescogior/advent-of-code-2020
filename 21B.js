// https://adventofcode.com/2020/day/21/input

(() => {
  const INPUT = $('pre')
    .textContent.split('\n')
    .slice(0, -1);
  const INGREDIENTS_ALLERGENES = INPUT.map(row => {
    const [ingredients_, allergenes_] = row.split(' (contains ');
    return {
      ingredients: ingredients_.split(' '),
      allergenes: allergenes_.slice(0, -1).split(', '),
    };
  });
  const ALL_ALLERGENES = (() => {
    const result = new Set();
    INGREDIENTS_ALLERGENES.forEach(({ allergenes }) => {
      allergenes.forEach(a => result.add(a));
    });
    return result;
  })();

  function intersection(array1, array2) {
    const set = new Set();
    array1.forEach(el => {
      if (array2.indexOf(el) > -1) set.add(el);
    });

    return [...set];
  }
  const ALLERGENE_CANDIDATE_INGREDIENTS_MAP = [...ALL_ALLERGENES].reduce(
    (acc, allergene) => ({
      ...acc,
      [allergene]: INGREDIENTS_ALLERGENES.filter(({ allergenes }) =>
        allergenes.includes(allergene),
      )
        .map(x => x.ingredients)
        .reduce(intersection),
    }),
    {},
  );

  const findAllMap = () => {
    let assigned = new Set();
    let theMap = { ...ALLERGENE_CANDIDATE_INGREDIENTS_MAP };
    while (Object.values(theMap).some(s => Array.isArray(s))) {
      theMap = Object.keys(theMap).reduce((acc, alle) => {
        const found = Array.isArray(theMap[alle]) && theMap[alle].length === 1;
        const ingre = found ? theMap[alle][0] : theMap[alle];
        assigned.add(ingre);

        return {
          ...acc,
          [alle]: ingre,
        };
      }, {});

      theMap = Object.keys(theMap).reduce(
        (acc, alle) => ({
          ...acc,
          [alle]: Array.isArray(theMap[alle])
            ? theMap[alle].filter(i => ![...assigned].includes(i))
            : theMap[alle],
        }),
        {},
      );
    }

    return theMap;
  };

  return Object.entries(findAllMap())
    .sort(([f1], [f2]) => (f1 > f2 ? 1 : -1))
    .map(([, a]) => a)
    .join(',');
})();
