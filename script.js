const gameBoard = (() => {
  const boardArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const getBoard = () => boardArr;

  return { getBoard };
})();

const displayController = (() => {
  const boardDiv = document.getElementsByClassName(".game-board");

  const display = () => {
    boardDiv.innerHTML = `Test`;
  };

  return {display};
})();

const playerFactoryconst = (name) => {
  const getName = () => name;
  return { name, getName };
};

displayController.display()