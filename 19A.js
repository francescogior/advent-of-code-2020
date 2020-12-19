// Copy and paste the following code in the browser console at https://adventofcode.com/2020/day/19/input

(() => {
  const EXAMPLE = false;
  const EXAMPLE_INPUT = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb
`;

  const INPUT = EXAMPLE ? EXAMPLE_INPUT : $('pre').textContent;
  const formatRule = ruleString => {
    if (['"a"', '"b"'].includes(ruleString)) return ruleString.slice(1, -1);
    return ruleString.split(' | ').map(s => s.split(' ').map(Number));
  };
  const [_RULES, _WORDS] = INPUT.split('\n\n');
  const WORDS = _WORDS.split('\n').slice(0, -1);
  const RULES = _RULES.split('\n').reduce(
    (acc, ruleRow) => ({
      ...acc,
      [ruleRow.split(': ')[0]]: formatRule(ruleRow.split(': ')[1]),
    }),
    {},
  );

  const COMPUTE_RULE_CACHE = {};

  const computeRule = ruleNumber => {
    const possiblyCached = COMPUTE_RULE_CACHE[ruleNumber];
    if (possiblyCached != null) return possiblyCached;
    let returnValue;
    const rule = RULES[ruleNumber];
    if (rule === 'a') returnValue = ['a'];
    else if (rule === 'b') returnValue = ['b'];
    else
      returnValue = rule
        .map(rulEl =>
          rulEl.reduce(
            (acc, ruleNumber) =>
              acc.flatMap(s => computeRule(ruleNumber).map(c => `${s}${c}`)),
            [''],
          ),
        )
        .flat();
    COMPUTE_RULE_CACHE[ruleNumber] = returnValue;
    return returnValue;
  };

  const RULE_0 = computeRule(0);

  return WORDS.filter(word => RULE_0.includes(word)).length;
})();
