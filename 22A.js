// @flow

(() => {
  const EXAMPLE = false;
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

  const play = (player1, player2) => {
    let deck1 = [...player1];
    let deck2 = [...player2];

    while (deck1.length > 0 && deck2.length > 0) {
      const [card1, ...restDeck1] = deck1;
      const [card2, ...restDeck2] = deck2;
      if (card1 > card2) {
        deck1 = [...restDeck1, card1, card2];
        deck2 = restDeck2;
      } else {
        deck2 = [...restDeck2, card2, card1];
        deck1 = restDeck1;
      }
    }
    const winningDeck = deck1.length > 0 ? deck1 : deck2;

    return winningDeck.reduce(
      (acc, card, index) => acc + (winningDeck.length - index) * card,
      0,
    );
  };

  return play(PLAYER_1, PLAYER_2);
})();
