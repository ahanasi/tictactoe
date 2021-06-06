const gameBoard = (() => {
  const boardArr = new Array(9);
  const winConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  const getBoard = () => boardArr;
  const setBoard = (index, marker) => {
    boardArr[index] = marker;
  };

  const resetBoard = () => {
    boardArr.splice(0, boardArr.length);
  };

  const isWin = (index) => winConditions.some((winCondition) => {
      if (
        winCondition.includes(index) &&
        boardArr[winCondition[0] - 1] === boardArr[winCondition[1] - 1] &&
        boardArr[winCondition[0] - 1] === boardArr[winCondition[2] - 1] &&
        boardArr[winCondition[0] - 1] != null
      ) {
        return true;
      }
      return false;
    });

  return { getBoard, setBoard, resetBoard, isWin };
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

  const placeMarker = (tile, marker) => {
    const chosenTile = tile;
    chosenTile.textContent = marker;
  };

  const reset = () => {
    if (!!doc && 'querySelector' in doc) {
      tiles.forEach((tile) => {
        const chosenTile = tile;
        chosenTile.textContent = '';
      });
    }
  };

  return { displayToDOM, placeMarker, reset };
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
  const resetBtn = document.querySelector('.reset-btn');

  let currentPlayer = player1;

  displayController.displayToDOM();

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const resetGame = () => {
    gameBoard.resetBoard();
    displayController.reset();
    game(document);
  };

  const round = (element) => {
    const chosenTile = element;
    const markerPosition = chosenTile.dataset.index;
    displayController.displayToDOM();

    if (chosenTile.textContent === '') {
      displayController.placeMarker(chosenTile, currentPlayer.getMarker());
      gameBoard.setBoard(markerPosition - 1, currentPlayer.getMarker());
      if (gameBoard.isWin(parseInt(chosenTile.dataset.index, 10))) {
        alert(`${currentPlayer.getName()} has won!`);
      } else {
        switchPlayer();
      }
    }
  };

  if (!!doc && 'querySelector' in doc) {
    tiles.forEach((tile) => {
      tile.addEventListener('click', () => {
        round(tile);
      });
    });

    resetBtn.addEventListener('click', () => {
      resetGame();
    });
  }
};

game(document);
