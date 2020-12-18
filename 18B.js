// Copy and paste this code on the browser console while on https://adventofcode.com/2020/day/18/input to get the result

(() => {
  const INPUT = $('pre')
    .textContent.split('\n')
    .slice(0, -1);

  const sum = (a, b) => a + b;
  const hasParens = exprString => exprString.indexOf(')') > -1;
  const hasPluses = exprString => exprString.indexOf('+') > -1;

  const addParensInExpressionWithoutParens = exprString => {
    return exprString.replace(/(\d+ \+ \d+)/g, '($1)');
  };

  const solveSumsInParens = exprString =>
    exprString.replace(/\(([\d+ \+ \d+]+)\)/g, match =>
      eval(match.slice(1, -1)),
    );

  const solveExpressionWithoutParens = exprString => {
    let result = exprString;
    while (hasPluses(result)) {
      result = addParensInExpressionWithoutParens(result);
      result = solveSumsInParens(result);
    }
    return eval(result);
  };

  const processExpression = exprString => {
    let result = exprString;
    while (hasParens(result))
      result = result.replace(/\(([^\)^\(]+)\)/g, expr =>
        solveExpressionWithoutParens(expr.slice(1, -1)),
      );
    return solveExpressionWithoutParens(result);
  };

  return INPUT.map(processExpression)
    .map(Number)
    .reduce(sum);
})();
