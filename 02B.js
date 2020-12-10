// copy and paste this in the browser console at https://adventofcode.com/2020/day/2/input to get the solution

// parse input and remove extra line
$('pre')
  .textContent.split('\n') 
  .slice(0, -1)

// format the input conveniently
  .map(x => x.split(' '))
  .map(([positionsString, charWithColon, password]) => ({
    positions: positionsString.split('-').map(Number),
    char: charWithColon[0],
    password,
  }))
  
// check if char is in exactly one of the (1-indexed) positions 
  .map(({ positions: [pos1, pos2], char, password }) => (password[pos1 - 1] === char) !== (password[pos2 - 1] === char))
  
  // count valid passwords
  .filter(Boolean).length;
