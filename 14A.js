// copy and paste this in the browser console at https://adventofcode.com/2020/day/14/input to get the solution

INPUT = $('pre')
  .textContent.split('\n')
  .slice(0, -1);
X = 'X';
INSTRUCTIONS = INPUT.map(ins => {
  if (ins.startsWith('mask')) {
    const [, value] = ins.split(' = ');
    return { ins: 'mask', value };
  }
  if (ins.startsWith('mem')) {
    const [, addressString] = ins.match(/mem\[(\d+)\]/);
    const [, valueString] = ins.split(' = ');
    return {
      ins: 'mem',
      address: parseInt(addressString, 10),
      value: parseInt(valueString, 10),
    };
  }
});

toBinary = number => {
  if (number === 0) return '0';
  if (number === 1) return '1';
  return `${toBinary(Math.floor(number / 2))}${number % 2}`;
};

binaryTo36String = binary => {
  if (binary.length === 36) return binary;
  return binaryTo36String(`0${binary}`);
};

computeValue = (value, mask) => {
  const valueBits = binaryTo36String(toBinary(value)).split('');
  const maskBits = mask.split('');
  const resultBits = maskBits.map((m, index) =>
    m === 'X' ? valueBits[index] : m,
  );
  return parseInt(resultBits.join(''), 2);
};

run = instructions => {
  const MAX = Math.max(
    ...instructions.filter(i => i.ins === 'mem').map(i => i.address),
  );
  let MEMORY = new Array(MAX + 1).fill(0);
  let MASK = null;
  for (i of instructions) {
    if (i.ins === 'mask') {
      MASK = i.value;
    }
    if (i.ins === 'mem') {
      MEMORY[i.address] = computeValue(i.value, MASK);
    }
  }
  return MEMORY;
};

run(INSTRUCTIONS).reduce((a, b) => a + b);
