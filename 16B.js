
// copy and paste this in the browser console at https://adventofcode.com/2020/day/16/input to get the solution

INPUT = $('pre').textContent.split('\n\n');

[RULES_INPUT, MY_TICKET_INPUT, NEARBY_TICKETS_INPUT] = INPUT;

range = (from, to) => {
  let result = [];
  for (let i = from; i <= to; i++) result.push(i);
  return result;
};

getColumn = (columnIndex, matrix) => {
  return matrix.map(row => row[columnIndex]).flat();
};

RULES = RULES_INPUT.split('\n').reduce((acc, ruleRow) => {
  const [fieldName, ruleValueString] = ruleRow.split(':');
  const ranges = ruleValueString
    .split(' or ')
    .map(rangeString => range(...rangeString.split('-').map(Number)));
  return {
    ...acc,
    [fieldName]: ranges,
  };
}, {});

NEARBY_TICKETS = NEARBY_TICKETS_INPUT.split('\n')
  .slice(1)
  .map(ticketRow => ticketRow.split(',').map(Number));

VALID_NEARBY_TICKETS = NEARBY_TICKETS.filter(
  ticket =>
    ticket.filter(value =>
      Object.keys(RULES).some(rule =>
        RULES[rule].some(range => range.includes(value)),
      ),
    ).length === 20,
);

RULES_ORDER_PARTIAL = range(0, 19).map(index =>
  getColumn(index, VALID_NEARBY_TICKETS).reduce((candidateRules, value) => {
    return candidateRules.filter(rule => {
      return RULES[rule].some(range => range.includes(value));
    });
  }, Object.keys(RULES)),
);

solveRulesOrder = rulesOrderPartial => {
  let rulesOrder = [...rulesOrderPartial];
  let confirmedRules = new Set();
  while (rulesOrder.map(r => r.length).some(l => l > 1)) {
    rulesOrder.forEach(rule => {
      if (rule.length === 1) confirmedRules.add(rule[0]);
    });

    rulesOrder = rulesOrder.map(rules =>
      rules.length === 1 ? rules : rules.filter(r => !confirmedRules.has(r)),
    );
  }
  return rulesOrder;
};

RULES_ORDER = solveRulesOrder(RULES_ORDER_PARTIAL).flat();
MY_TICKET = MY_TICKET_INPUT.split('\n')[1]
  .split(',')
  .map(Number);
MY_COMPLETE_TICKET = RULES_ORDER.reduce(
  (acc, ruleName, index) => ({ ...acc, [ruleName]: MY_TICKET[index] }),
  {},
);

Object.keys(MY_COMPLETE_TICKET)
  .filter(fieldName => fieldName.startsWith('departure'))
  .reduce((acc, fieldName) => acc * MY_COMPLETE_TICKET[fieldName], 1);
