// copy and paste this in the browser console at https://adventofcode.com/2020/day/2/input to get the solution

// parse input and remove extra line
$('pre')
  .textContent.split('\n') 
  .slice(0, -1)

// format the input conveniently
  .map(x => x.split(' '))
  .map(([rangeString, charWithColon, password]) => ({
    range: rangeString.split('-').map(Number),
    char: charWithColon[0],
    password,
  }))
  
// count occurrences of char in the password and checks that it's within range
  .map(({ range: [min, max], char, password }) => {
    const count = password
      .split('')
      .reduce(
        (currentCount, currentChar) =>
          currentChar === char ? currentCount + 1 : currentCount,
        0,
      );
    return count <= max && count >= min;
  })
  
  // count valid passwords
  .filter(Boolean).length;
