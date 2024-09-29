export const isWinner = (gameBoard, currentMove, currentPlayer) => {
  let board = [...gameBoard];
  board[currentMove] = currentPlayer;

  const winningLines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c, d] = winningLines[i];
    if (
      board[a] > 0 &&
      board[a] === board[b] &&
      board[a] === board[c] &&
      board[a] === board[d]
    ) {
      return true;
    }
  }
  return false;
};

export const isDraw = (gameBoard, currentMove, currentPlayer) => {
  let board = [...gameBoard];
  board[currentMove] = currentPlayer;

  let count = board.reduce((n, x) => n + (x === 0), 0);
  return count === 0;
};

const getRandomComputerMove = (gameBoard) => {
  let validMoves = [];
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === 0) {
      validMoves.push(i);
    }
  }
  const randomMove = Math.floor(Math.random() * validMoves.length);
  return validMoves[randomMove];
};

const getPositions = (gameBoard, moveChecks) => {
  for (let i = 0; i < moveChecks.length; i++) {
    for (let j = 0; j < moveChecks[i].max; j += moveChecks[i].step) {
      // Check that all indexes are within bounds before attempting to access gameBoard
      const index0 = j + moveChecks[i].indexes[0];
      const index1 = j + moveChecks[i].indexes[1];
      const index2 = j + moveChecks[i].indexes[2];
      const index3 = j + moveChecks[i].indexes[3];

      if (
        index0 < gameBoard.length &&
        index1 < gameBoard.length &&
        index2 < gameBoard.length &&
        index3 < gameBoard.length
      ) {
        let series =
          gameBoard[index0].toString() +
          gameBoard[index1].toString() +
          gameBoard[index2].toString() +
          gameBoard[index3].toString();

        switch (series) {
          case "0111":
          case "0222":
            return index0;
          case "1011":
          case "2022":
            return index1;
          case "1101":
          case "2202":
            return index2;
          case "1110":
          case "2220":
            return index3;
          default:
            break;
        }
      }
    }
  }
  return undefined; // Return undefined if no valid position is found
};


export const getComputerMove = (gameBoard) => {
  let moveChecks = [
    // vertical
    {
      indexes: [0, 1, 2, 3],
      max: 4,
      step: 1,
    },
    // horizontal
    {
      indexes: [0, 4, 8, 12],
      max: 16,
      step: 4,
    },
    // diagonal
    {
      indexes: [0, 5, 10, 15],
      max: 16,
      step: 5,
    },
    // diagonal
    {
      indexes: [3, 6, 9, 12],
      max: 16,
      step: 3,
    },
  ];

  let position = getPositions(gameBoard, moveChecks);
  if (position > 1) return position;
  return getRandomComputerMove(gameBoard);
};
