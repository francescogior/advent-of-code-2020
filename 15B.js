// No link to the input page, just copy paste in any console
INITIAL_NUMBERS = [1, 12, 0, 20, 8, 16];

// this would work for 15A too, it's just more optimised

// It still hangs and then fail while on the chrome console on my macbook 12 inches
// Worked on node run on the terminal

play = (initialNumbers, TURNS) => {
  let lastIndexes = initialNumbers
    .slice(0, -1)
    .reduce((acc, n, i) => ({ ...acc, [n]: i }), {});

  let currentNumber = initialNumbers[initialNumbers.length - 1];

  for (let i = initialNumbers.length; i < TURNS; i++) {
    let currentNumberLastIndex = lastIndexes[currentNumber];

    lastIndexes[currentNumber] = i - 1;
    if (currentNumberLastIndex == null) currentNumber = 0;
    else currentNumber = i - 1 - currentNumberLastIndex;
  }
  return currentNumber;
};


// ### USE AT YOUR OWN RISK!!! ###
play(INITIAL_NUMBERS, 30000000)
