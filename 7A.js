// TODO add comments

data = $('pre')
  .textContent.split('\n')
  .slice(0, -1)
  .reduce((acc, line) => {
    const [colorVariant, colorName, , , ...containedBagsArr] = line.split(' ');
    const _containedBags = containedBagsArr.join(' ').split(', ');
    const containedBags =
      _containedBags[0] === 'no other bags.'
        ? []
        : _containedBags.map(ruleStr =>
            ruleStr
              .split(' ')
              .slice(1, 3)
              .join(' '),
          );
    return {
      ...acc,
      [`${colorVariant} ${colorName}`]: containedBags,
    };
  }, {});

findIncludingBags = bagColor =>
  Object.keys(data).filter(color => data[color].includes(bagColor));

recursivelyFindIncludingBags = bagColor => {
  const includingBagsColors = findIncludingBags(bagColor);
  return includingBagsColors
    .concat(includingBagsColors.map(recursivelyFindIncludingBags))
    .flat();
};

new Set(recursivelyFindIncludingBags('shiny gold')).size;
