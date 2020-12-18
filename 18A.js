// Copy and paste this code on the browser console while on https://adventofcode.com/2020/day/18/input to get the result

(() => {
  const INPUT = $('pre')
    .textContent.split('\n')
    .slice(0, -1);

  const sum = (a, b) => a + b;
  const hasParens = exprString => exprString.indexOf(')') > -1;

  const processExpressionWithoutParens = exprString => {
    let b = exprString;
    while (!Number(b))
      b = b = b.replace(/(\d+ [\+\*] \d+)/, exprString => eval(exprString));
    return b;
  };
  
  const processExpression = exprString => {
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
