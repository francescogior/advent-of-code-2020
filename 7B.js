// copy and paste this in the browser console at https://adventofcode.com/2020/day/7/input to get the solution

data = $('pre')
  .textContent.split('\n')
  .slice(0, -1)
  .reduce((acc, line) => {
    const [colorVariant, colorName, , , ...containedBagsArr] = line.split(' ');
    const _containedBags = containedBagsArr.join(' ').split(', ');
    const containedBags =
      _containedBags[0] === 'no other bags.'
        ? {}
        : _containedBags.reduce((acc, ruleStr) => {
    const [number, colorVariant, colorName] = ruleStr.split(' ');
        return {
            ...acc,
             [`${colorVariant} ${colorName}`]: Number(number)
        }
        }, {});
    return {
      ...acc,
      [`${colorVariant} ${colorName}`]: containedBags,
    };
  }, {});

countBags  = (color) => {
    let count = 0
    for (innerColor in data[color]) {
        count = count + data[color][innerColor] + data[color][innerColor] * countBags(innerColor)
    }
return count
}

countBags('shiny gold')
