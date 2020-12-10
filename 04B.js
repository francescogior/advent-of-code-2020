// copy and paste this in the browser console at https://adventofcode.com/2020/day/4/input to get the solution

// Same as https://github.com/francescogior/advent-of-code-2020/blob/main/4A.js
// but with more complex validation

isValidHeight = hgt => {
  // hgt (Height) - a number followed by either cm or in:

  const match = hgt.match(/^(\d+)(cm|in)$/);
  if (match == null) return false;
  const [, valueString, unit] = match;
  // If cm, the number must be at least 150 and at most 193.
  if (unit === 'cm' && 150 <= Number(valueString) && Number(valueString) <= 193)
    return true;
  // If in, the number must be at least 59 and at most 76.
  if (unit === 'in' && 59 <= Number(valueString) && Number(valueString) <= 76)
    return true;
};

isValidPassport = ({ byr, iyr, eyr, hgt, hcl, ecl, pid }) =>
  // byr, iyr, eyr, hgt, hcl, ecl, pid must be present

  byr != null &&
  iyr != null &&
  eyr != null &&
  hgt != null &&
  hcl != null &&
  ecl != null &&
  pid != null &&
  
  // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  byr.length === 4 &&
  1920 <= Number(byr) &&
  Number(byr) <= 2002 &&
  
  // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  iyr.length === 4 &&
  2010 <= Number(iyr) &&
  Number(iyr) <= 2020 &&
  
  // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  eyr.length === 4 &&
  2020 <= Number(eyr) &&
  Number(eyr) <= 2030 &&
  isValidHeight(hgt) &&
  
  // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  /^#[\da-f]{6}$/.test(hcl) &&
  
  // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl) &&
  
  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  /^\d{9}$/.test(pid);

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

      // finally we transform the passport data in an object for convenience
      .reduce((acc, s) => ({ ...acc, [s.split(':')[0]]: s.split(':')[1] }), {}),
  )

  // we filter the valid passports:
  .filter(isValidPassport)
  
  // and count them
  .length;

