data = $('pre').textContent.split('\n').slice(0, -1).reduce((acc, line) => {

const [colorVariant, colorName, , , ...containedBagsArr] = line.split(' ');
const rules = containedBagsArr.join(' ').split(', ').reduce((acc, ruleStr) => {
  const [number, colorVariant, colorName] = ruleStr.split(' ');

  return {
    ...acc,
    [`${colorVariant} ${colorName}`]: Number(number)
  };
}, {})
return {
...acc,
[`${colorVariant} ${colorName}`]: rules
}

}, {})

replace = (obj) => mapObj(obj, (n, c) => isEmpty(data[c]) ? n : replace(multiplyObj(data[c], n)))
mapObj = (obj, iteratee) => Object.keys(obj).reduce((acc, v) => ({
...acc,
[v]: iteratee(obj[v], v)
}), {})
multiplyObj = (obj, m) => typeof obj === 'number' ? obj * number : mapObj(obj, n => m * n)
isEmpty = obj => Object.keys(obj).length === 0

WIP
