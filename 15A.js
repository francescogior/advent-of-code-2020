// No link to the input page, just copy paste in any console
INITIAL_NUMBERS = [1, 12, 0, 20, 8, 16];
play = initialNumbers => {
  let numbers = [...initialNumbers];
  while (numbers.length < 2020) {
    const lastNumber = numbers[numbers.length - 1];
    const lastNumberIndex = numbers.slice(0, -1).lastIndexOf(lastNumber);
    if (lastNumberIndex === -1) numbers.push(0);
    else numbers.push(numbers.length - 1 - lastNumberIndex);
  }
  return numbers;
};

play(INITIAL_NUMBERs)[2019];
