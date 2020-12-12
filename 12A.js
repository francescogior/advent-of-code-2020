// copy and paste this in the browser console at https://adventofcode.com/2020/day/12/input to get the solution

INPUT = $('pre')
  .textContent.split('\n')
  .slice(0, -1);

INSTRUCTIONS = INPUT.map(s => ({ i: s.slice(0, 1), v: Number(s.slice(1)) }));
INITIAL_POS = { facing: 'E', E: 0, N: 0, W: 0, S: 0 };
LEFTWARD = ['N', 'W', 'S', 'E'];
RIGHTWARD = ['N', 'E', 'S', 'W'];

getNextPos = (pos, { i, v }) => {
  if (i === 'F') return { ...pos, [pos.facing]: pos[pos.facing] + v };
  if (i === 'L')
    return {
      ...pos,
      facing: LEFTWARD[(v / 90 + LEFTWARD.indexOf(pos.facing)) % 4],
    };
  if (i === 'R')
    return {
      ...pos,
      facing: RIGHTWARD[(v / 90 + RIGHTWARD.indexOf(pos.facing)) % 4],
    };
  else return { ...pos, [i]: pos[i] + v };
};

getFinalPos = (initialPos, instructions) =>
  instructions.reduce(getNextPos, initialPos);

getManhattanDistance = ({ E, N, W, S }) => Math.abs(N - S) + Math.abs(E - W);

getManhattanDistance(getFinalPos(INITIAL_POS, INSTRUCTIONS));
