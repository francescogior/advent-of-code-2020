// Copy and paste the following code in the browser console at https://adventofcode.com/2020/day/19/input

(() => {
  const EXAMPLE = false;
  const SIMPLE = false;
  const SIMPLE_EXAMPLE_INPUT = `0: 4 1 5
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
  const EXAMPLE_INPUT = `42: 9 14 | 10 1
9: 14 27 | 1 26
10: 23 14 | 28 1
1: "a"
11: 42 31
5: 1 14 | 15 1
19: 14 1 | 14 14
12: 24 14 | 19 1
16: 15 1 | 14 14
31: 14 17 | 1 13
6: 14 14 | 1 14
2: 1 24 | 14 4
0: 8 11
13: 14 3 | 1 12
15: 1 | 14
17: 14 2 | 1 7
23: 25 1 | 22 14
28: 16 1
4: 1 1
20: 14 14 | 1 15
3: 5 14 | 16 1
27: 1 6 | 14 18
14: "b"
21: 14 1 | 1 14
25: 1 1 | 1 14
22: 14 14
8: 42
26: 14 22 | 1 20
18: 15 15
7: 14 5 | 1 21
24: 14 1

abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa
bbabbbbaabaabba
babbbbaabbbbbabbbbbbaabaaabaaa
aaabbbbbbaaaabaababaabababbabaaabbababababaaa
bbbbbbbaaaabbbbaaabbabaaa
bbbababbbbaaaaaaaabbababaaababaabab
ababaaaaaabaaab
ababaaaaabbbaba
baabbaaaabbaaaababbaababb
abbbbabbbbaaaababbbbbbaaaababb
aaaaabbaabaaaaababaa
aaaabbaaaabbaaa
aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
babaaabbbaaabaababbaabababaaab
aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba
`;

  const INPUT = EXAMPLE
    ? SIMPLE
      ? SIMPLE_EXAMPLE_INPUT
      : EXAMPLE_INPUT
    : $('pre').textContent;
  const formatRule = ruleString => {
    if (['"a"', '"b"'].includes(ruleString)) return ruleString.slice(1, -1);
    return ruleString.split(' | ').map(s => s.split(' ').map(Number));
  };
  const [_RULES, _WORDS] = INPUT.split('\n\n');
  const WORDS = _WORDS.split('\n').slice(0, -1);
  const __RULES = _RULES.split('\n').reduce(
    (acc, ruleRow) => ({
      ...acc,
      [ruleRow.split(': ')[0]]: formatRule(ruleRow.split(': ')[1]),
    }),
    {},
  );

  const RULES = {
    ...__RULES,
    // [`8`]: [[42], [42, 8]],
    // [`11`]: [
    //   [42, 31],
    //   [42, 11, 31],
    // ],
  };

  const COMPUTE_RULE_CACHE = {};

  const computeRule = ruleNumber => {
    const possiblyCached = COMPUTE_RULE_CACHE[ruleNumber];
    if (possiblyCached != null) return possiblyCached;
    let returnValue;
    const rule = RULES[ruleNumber];
    if (rule === 'a') returnValue = 'a';
    else if (rule === 'b') returnValue = 'b';
    else if (ruleNumber === 8) returnValue = `(${computeRule(42)})+`;
    else if (ruleNumber === 11) {
      const RULE_42 = computeRule(42);
      const RULE_31 = computeRule(31);
      returnValue = `(${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        .map(i => `((${RULE_42}){${i}}(${RULE_31}){${i}})`)
        .join('|')})`;
    } else
      returnValue = `(${rule
        .map(rulEl =>
          rulEl.reduce(
            (acc, ruleSubNumber) => `${acc}${computeRule(ruleSubNumber)}`,
            '',
          ),
        )
        .join('|')})`;

    COMPUTE_RULE_CACHE[ruleNumber] = returnValue;
    return returnValue;
  };

  const RULE_0 = computeRule(0);
  const REGEX_0 = new RegExp(`^${RULE_0}$`);

  return WORDS.filter(word => REGEX_0.test(word)).length;
})();
