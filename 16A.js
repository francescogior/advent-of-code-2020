// copy and paste this in the browser console at https://adventofcode.com/2020/day/16/input to get the solution

INPUT = $('pre').textContent.split('\n\n');

[RULES_INPUT, MY_TICKET_INPUT, NEARBY_TICKETS_INPUT] = INPUT;

range = (from, to) => {
  let result = [];
  for (let i = from; i <= to; i++) result.push(i);
  return result;
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

NEARBY_TICKETS.map(ticket =>
  ticket.filter(value => {
    for (rule in RULES)
      for (range of RULES[rule]) if (range.includes(value)) return false;
    return true;
  }),
)
  .flat()
  .reduce((a, b) => a + b);
