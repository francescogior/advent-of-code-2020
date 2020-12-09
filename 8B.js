// copy and paste this in the browser console at https://adventofcode.com/2020/day/8/input to get the solution

data = $('pre')
  .textContent.split('\n')
  .slice(0, -1)
  .map(s => {
    const [command, valueString] = s.split(' ');
    return [command, Number(valueString)];
  });

runProgram = program => {
  let acc = 0;
  let step = 0;
  let walkedSteps = new Set();
  while (!walkedSteps.has(step) && step < program.length) {
    walkedSteps.add(step);
    const [command, value] = program[step];
    if (command === 'acc') {
      acc = acc + value;
      step++;
    }
    if (command === 'jmp') {
      step = step + value;
    }
    if (command === 'nop') {
      step++;
    }
  }
  return [acc, step];
};

findBug = () => {
  let acc = 0;
  let step = 0;
  let lastUpdatedCommandIndex = -1;
  while (step !== data.length) {
    const indexToUpdate = data.findIndex(
      ([command], index) =>
        index > lastUpdatedCommandIndex && ['jmp', 'nop'].includes(command),
    );
    lastUpdatedCommandIndex = indexToUpdate;
    let updatedProgram = [...data];
    updatedProgram[indexToUpdate] = [
      data[indexToUpdate][0] === 'jmp' ? 'nop' : 'jmp',
      data[indexToUpdate][1],
    ];
    [acc, step] = runProgram(updatedProgram);
  }
  return acc;
};

findBug();
