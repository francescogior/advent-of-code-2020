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

getFloatingAddresses = mask => {
  return mask.split('').reduce(
    (acc, currentBitx, index, bitxs) => {
      if (currentBitx !== 'X') return acc.map(s => `${s}${currentBitx}`);
      else return acc.map(s => [`${s}${0}`, `${s}${1}`]).flat();
    },
    [''],
  );
};

computeAddresses = (address, mask) => {
  const addressBits = binaryTo36String(toBinary(address)).split('');
  const maskBits = mask.split('');
  const resultBits = maskBits.map((m, index) =>
    m === '0' ? addressBits[index] : m,
  );
  return getFloatingAddresses(resultBits.join('')).map(x => parseInt(x, 2));
};

run = instructions => {
  const MAX = Math.max(
    ...instructions.filter(i => i.ins === 'mem').map(i => i.address),
  );
  let MEMORY = {};
  let MASK = null;
  for (i of INSTRUCTIONS) {
    if (i.ins === 'mask') {
      MASK = i.value;
    }
    if (i.ins === 'mem') {
      computeAddresses(i.address, MASK).forEach(address => {
        MEMORY[address] = i.value;
      });
    }
  }
  return MEMORY;
};

const FINAL_MEMORY = run(INSTRUCTIONS);

Object.keys(FINAL_MEMORY).reduce((a, b) => a + FINAL_MEMORY[b], 0);
