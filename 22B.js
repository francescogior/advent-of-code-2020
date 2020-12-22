
(() => {
  const EXAMPLE = false;
  const LOG = true;
  function logger(...args) {
    if (LOG) console.log(...args);
  }
  const INPUT_EXAMPLE = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

  const INPUT = EXAMPLE ? INPUT_EXAMPLE : $('pre').textContent.slice(0, -1);
  const [_PLAYER_1, _PLAYER_2] = INPUT.split('\n\n');

  const PLAYER_1 = _PLAYER_1
    .split('\n')
    .slice(1)
    .map(Number);
  const PLAYER_2 = _PLAYER_2
    .split('\n')
    .slice(1)
    .map(Number);

  let _gameCounter = 0;
  const playRecursively = (player1, player2) => {
    const played = new Set();

    let deck1 = [...player1];
    let deck2 = [...player2];

    let roundCounter = 0;
    const gameCounter = ++_gameCounter;

    while (deck1.length > 0 && deck2.length > 0) {
      if (played.has([deck1, deck2].map(s => s.join(',')).join(';'))) {
        logger('Loop detected, Player 1 won');
        return [true];
      }
      played.add([deck1, deck2].map(s => s.join(',')).join(';'));

      roundCounter++;
      const [card1, ...restDeck1] = deck1;
      const [card2, ...restDeck2] = deck2;

      logger('Game', gameCounter, 'Round', roundCounter);
      logger('Player 1:', deck1.join(', '));
      logger('Player 2:', deck2.join(', '));

      if (card1 <= restDeck1.length && card2 <= restDeck2.length) {
        logger('Playing a subgame');
        const [player1WonSubgame] = playRecursively(
          restDeck1.slice(0, card1),
          restDeck2.slice(0, card2),
        );
        if (player1WonSubgame) {
          deck1 = [...restDeck1, card1, card2];
          deck2 = restDeck2;
          logger('Player 1 won');
        } else {
          deck2 = [...restDeck2, card2, card1];
          deck1 = restDeck1;
          logger('Player 2 won');
        }
      } else {
        if (card1 > card2) {
          deck1 = [...restDeck1, card1, card2];
          deck2 = restDeck2;
          logger('Player 1 won');
        } else {
          deck2 = [...restDeck2, card2, card1];
          deck1 = restDeck1;
          logger('Player 2 won');
        }
      }
    }
    const winningDeck = deck1.length > 0 ? deck1 : deck2;
    logger(
      'Player',
      deck1.length > 0 ? 1 : 2,
      'is the winner of game',
      gameCounter,
    );
    return [
      deck1.length > 0,
      winningDeck.reduce(
        (acc, card, index) => acc + (winningDeck.length - index) * card,
        0,
      ),
    ];
  };

  return playRecursively(PLAYER_1, PLAYER_2)[1];
})();
