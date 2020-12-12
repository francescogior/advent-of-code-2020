// copy and paste this in the browser console at https://adventofcode.com/2020/day/12/input to get the solution

INPUT = $('pre')
  .textContent.split('\n')
  .slice(0, -1);

INSTRUCTIONS = INPUT.map(s => ({ i: s.slice(0, 1), v: Number(s.slice(1)) }));
INITIAL_POS = { facing: 'E', E: 0, N: 0, W: 0, S: 0 };
WAYPOINT_INITIAL_POS = { E: 10, N: 1, W: 0, S: 0 };
LEFTWARD = ['N', 'W', 'S', 'E'];
RIGHTWARD = ['N', 'E', 'S', 'W'];

getNextPoss = ({ pos, wPos }, { i, v }) => {
  if (i === 'F')
    return {
      pos: {
        E: pos.E + v * wPos.E,
        N: pos.N + v * wPos.N,
        W: pos.W + v * wPos.W,
        S: pos.S + v * wPos.S,
      },
      wPos,
    };
  if (i === 'L')
    return {
      pos,
      wPos: {
        E: wPos[RIGHTWARD[(v / 90 + RIGHTWARD.indexOf('E')) % 4]],
        N: wPos[RIGHTWARD[(v / 90 + RIGHTWARD.indexOf('N')) % 4]],
        W: wPos[RIGHTWARD[(v / 90 + RIGHTWARD.indexOf('W')) % 4]],
        S: wPos[RIGHTWARD[(v / 90 + RIGHTWARD.indexOf('S')) % 4]],
      },
    };
  if (i === 'R')
    return {
      pos,
      wPos: {
        E: wPos[LEFTWARD[(v / 90 + LEFTWARD.indexOf('E')) % 4]],
        N: wPos[LEFTWARD[(v / 90 + LEFTWARD.indexOf('N')) % 4]],
        W: wPos[LEFTWARD[(v / 90 + LEFTWARD.indexOf('W')) % 4]],
        S: wPos[LEFTWARD[(v / 90 + LEFTWARD.indexOf('S')) % 4]],
      },
    };
  else return { pos, wPos: { ...wPos, [i]: wPos[i] + v } };
};

getFinalPoss = (initialPoss, instructions) =>
  instructions.reduce(getNextPoss, initialPoss);

getManhattanDistance = ({ E, N, W, S }) => Math.abs(N - S) + Math.abs(E - W);

getManhattanDistance(
  getFinalPoss({ pos: INITIAL_POS, wPos: WAYPOINT_INITIAL_POS }, INSTRUCTIONS)
    .pos,
);
