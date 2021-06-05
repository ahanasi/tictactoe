const gameBoard = (() => {
  const boardArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const getBoard = () => boardArr;
  const setBoard = (index, marker) => {
    boardArr[index] = marker;
  };

  return { getBoard, setBoard };
})();

const displayController = ((doc) => {
  const tiles = Array.from(doc.getElementsByClassName('tile'));

  const displayToDOM = () => {
    if (!!doc && 'querySelector' in doc) {
      tiles.forEach((tile, i) => {
        const chosenTile = tile;
        chosenTile.textContent = gameBoard.getBoard()[i];
      });
    }
  };

  const changeMarker = (tile, marker) => {
    const chosenTile = tile;
    chosenTile.textContent = marker;
  };

  return { displayToDOM, changeMarker };
})(document);

const playerFactory = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
};

const game = (doc) => {
  const player1 = playerFactory('Ahana', 'X');
  const player2 = playerFactory('Chander', 'O');
  const tiles = Array.from(doc.getElementsByClassName('tile'));
  let currentPlayer = player1;

  displayController.displayToDOM();

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const round = (element) => {
    const chosenTile = element;
    const markerPosition = chosenTile.dataset.index;

    displayController.displayToDOM();
    displayController.changeMarker(chosenTile, currentPlayer.getMarker());
    gameBoard.setBoard(markerPosition - 1, currentPlayer.getMarker());
    switchPlayer();
  };

  if (!!doc && 'querySelector' in doc) {
    tiles.forEach((tile) => {
      tile.addEventListener('click', () => {
        round(tile);
      });
    });
  }
};

game(document);
