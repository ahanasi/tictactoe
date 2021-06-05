const gameBoard = (() => {
  const boardArr = new Array(9);
  const getBoard = () => boardArr;
  const setBoard = (index, marker) => {
    boardArr[index] = marker;
  };

  const resetBoard = () => {
    boardArr.splice(0, boardArr.length)
  }

  return { getBoard, setBoard, resetBoard };
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

  const reset = () => {
    if (!!doc && 'querySelector' in doc) {
      tiles.forEach((tile ) => {
        const chosenTile = tile;
        chosenTile.textContent = "";
      });
    }
  }

  return { displayToDOM, changeMarker, reset };
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
  }
  
  const round = (element) => {
    const chosenTile = element;
    const markerPosition = chosenTile.dataset.index;
    displayController.displayToDOM();

    if (chosenTile.textContent === "") {
      displayController.changeMarker(chosenTile, currentPlayer.getMarker());
      gameBoard.setBoard(markerPosition - 1, currentPlayer.getMarker());
      switchPlayer();
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

