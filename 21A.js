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
  const ALL_INGREDIENTS = (() => {
    const result = new Set();
    INGREDIENTS_ALLERGENES.forEach(({ ingredients }) => {
      ingredients.forEach(i => result.add(i));
    });
    return result;
  })();
  const ALL_ALLERGENES = (() => {
    const result = new Set();
    INGREDIENTS_ALLERGENES.forEach(({ allergenes }) => {
      allergenes.forEach(a => result.add(a));
    });
    return result;
  })();

  function union(array1, array2) {
    const set = new Set();
    array1.forEach(el => {
      set.add(el);
    });
    array2.forEach(el => {
      set.add(el);
    });
    return [...set];
  }
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
  const canContain = Object.values(ALLERGENE_CANDIDATE_INGREDIENTS_MAP).reduce(
    union,
  );
  const cannotContain = [...ALL_INGREDIENTS].filter(
    i => !canContain.includes(i),
  );
  const count = ingredient => {
    return INGREDIENTS_ALLERGENES.reduce(
      (acc, a) => acc + (a.ingredients.includes(ingredient) ? 1 : 0),
      0,
    );
  };
  const sum = (a, b) => a + b;

  return cannotContain.map(count).reduce(sum);
})();
