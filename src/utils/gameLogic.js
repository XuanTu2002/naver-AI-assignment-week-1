export const PLAYERS = {
  X: "X",
  O: "O",
};

export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const createInitialBoard = () => Array(9).fill(null);

export const isBoardFull = (squares) => squares.every(Boolean);

export const getWinningLine = (squares) => {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
};

export const evaluateBoard = (squares) => {
  const winningLine = getWinningLine(squares);
  if (winningLine) {
    return {
      winner: squares[winningLine[0]],
      winningLine,
      isDraw: false,
      isComplete: true,
    };
  }

  if (isBoardFull(squares)) {
    return {
      winner: null,
      winningLine: null,
      isDraw: true,
      isComplete: true,
    };
  }

  return {
    winner: null,
    winningLine: null,
    isDraw: false,
    isComplete: false,
  };
};

export const makeMove = (squares, index, player) => {
  if (squares[index]) {
    return squares;
  }
  const nextSquares = squares.slice();
  nextSquares[index] = player;
  return nextSquares;
};
