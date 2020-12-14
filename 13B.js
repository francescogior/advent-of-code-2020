// copy and paste this in the browser console at https://adventofcode.com/2020/day/13/input to get the solution

INPUT = $('pre')
  .textContent.split('\n')
  .slice(0, -1);
X = 'x';
BUSES = INPUT[1].split(',').map((s, index) => (s === X ? s : Number(s)));

modulo = (a, n) => ((a % n) + n) % n;

// solve recursively a linear system
solveSystem = (...ans) => {
  const [[a1, n1], [a2, n2]] = ans;
  let k = 0;
  while (modulo(a1 + k * n1, n2) !== modulo(a2, n2)) k++;
  const solution = a1 + k * n1;
  if (ans.length === 2) return solution;
  return solveSystem([solution, n1 * n2], ...ans.slice(2));
};

solveSystem(
  ...BUSES.map((b, index) => (b === X ? X : [-index, b])).filter(b => b !== X),
);
