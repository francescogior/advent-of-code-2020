// copy and paste this in the browser console at https://adventofcode.com/2020/day/13/input to get the solution

INPUT = $('pre')
  .textContent.split('\n')
  .slice(0, -1);
X = 'x';
START = Number(INPUT[0]);
BUSES = INPUT[1]
  .split(',')
  .filter(a => a != X)
  .map(Number);

modulo = (a, n) => ((a % n) + n) % n;

WAITS = BUSES.map(b => b - modulo(START, b));
WAIT = Math.min(...WAITS);

WAIT * BUSES[WAITS.indexOf(WAIT)];
