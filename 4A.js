// copy and paste this in the browser console at https://adventofcode.com/2020/day/4/input to get the solution

// parse input
$('pre')
// lines are separated by two newlines
  .textContent.split('\n\n')
  
  // passport data are separated by newlines or spaces,
  // thus we need two nested maps and then flatten
  .map(s =>
    s
      .split('\n')
      .map(t => t.split(' '))
      .flat()
      
      // finally we transform the passport data in an object for conveniente
      .reduce((acc, s) => ({ ...acc, [s.split(':')[0]]: s.split(':')[1] }), {}),
  )
  
  // we filter the valid passports: byr, iyr, eyr, hgt, hcl, ecl, pid must be present
  .filter(
    ({ byr, iyr, eyr, hgt, hcl, ecl, pid }) =>
      byr != null &&
      iyr != null &&
      eyr != null &&
      hgt != null &&
      hcl != null &&
      ecl != null &&
      pid != null,
  )
  // count the valid passports
  .length;
