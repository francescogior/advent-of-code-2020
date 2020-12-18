// Copy and paste this code on the browser console while on https://adventofcode.com/2020/day/18/input to get the result

(() => {
  INPUT = $('pre')
    .textContent.split('\n')
    .slice(0, -1);

  sum = (a, b) => a + b;
  hasParens = exprString => exprString.indexOf(')') > -1;

  processExpressionWithoutParens = exprString => {
    let b = exprString;
    while (!Number(b))
      b = b = b.replace(/(\d+ [\+\*] \d+)/, exprString => eval(exprString));
    return b;
  };
  processExpression = exprString => {
    let result = exprString;
    while (hasParens(result))
      result = result.replace(/\(([^\)^\(]+)\)/g, expr =>
        processExpressionWithoutParens(expr.slice(1, -1)),
      );
    return processExpressionWithoutParens(result);
  };

  return INPUT.map(processExpression)
    .map(Number)
    .reduce(sum);
})();
