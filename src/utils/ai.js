import { evaluateBoard, PLAYERS, WINNING_LINES } from "./gameLogic";

const switchPlayer = (player) =>
  player === PLAYERS.X ? PLAYERS.O : PLAYERS.X;

const getEmptyIndices = (squares) =>
  squares.reduce((acc, value, index) => {
    if (!value) {
      acc.push(index);
    }
    return acc;
  }, []);

const scoreForWinner = (winner, aiPlayer, depth) => {
  if (winner === aiPlayer) {
    return 10 - depth;
  }
  if (winner === null) {
    return 0;
  }
  return depth - 10;
};

const minimaxInternal = (
  squares,
  currentPlayer,
  aiPlayer,
  depth,
  metrics
) => {
  metrics.positions += 1;

  const { winner, isDraw } = evaluateBoard(squares);
  if (winner !== null || isDraw) {
    return {
      score: scoreForWinner(winner, aiPlayer, depth),
    };
  }

  const emptyIndices = getEmptyIndices(squares);
  const isMaximizing = currentPlayer === aiPlayer;
  let bestScore = isMaximizing ? -Infinity : Infinity;

  for (const index of emptyIndices) {
    const nextSquares = squares.slice();
    nextSquares[index] = currentPlayer;
    const { score } = minimaxInternal(
      nextSquares,
      switchPlayer(currentPlayer),
      aiPlayer,
      depth + 1,
      metrics
    );
    if (isMaximizing) {
      if (score > bestScore) {
        bestScore = score;
      }
    } else if (score < bestScore) {
      bestScore = score;
    }
  }

  return { score: bestScore };
};

const findCriticalSquares = (squares, player) => {
  const indices = [];
  for (const [a, b, c] of WINNING_LINES) {
    const line = [a, b, c].map((index) => squares[index]);
    const filledCount = line.filter(Boolean).length;
    const playerCount = line.filter((value) => value === player).length;
    if (filledCount === 2 && playerCount === 2) {
      const emptyIndex = [a, b, c].find((index) => !squares[index]);
      if (emptyIndex !== undefined) {
        indices.push(emptyIndex);
      }
    }
  }
  return indices;
};

export const getHardAIMove = (
  squares,
  aiPlayer = PLAYERS.O,
  { onEvaluateMove } = {}
) => {
  const emptyIndices = getEmptyIndices(squares);
  if (emptyIndices.length === 0) {
    return null;
  }

  const metrics = { positions: 0 };
  let bestScore = -Infinity;
  let bestMove = emptyIndices[0];

  for (const index of emptyIndices) {
    const nextSquares = squares.slice();
    nextSquares[index] = aiPlayer;
    const { score } = minimaxInternal(
      nextSquares,
      switchPlayer(aiPlayer),
      aiPlayer,
      1,
      metrics
    );
    if (typeof onEvaluateMove === "function") {
      onEvaluateMove({ index, score });
    }
    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }

  return {
    index: bestMove,
    score: bestScore,
    positionsEvaluated: metrics.positions,
  };
};

export const getEasyAIMove = (squares, rng = Math.random) => {
  const emptyIndices = getEmptyIndices(squares);
  if (emptyIndices.length === 0) {
    return null;
  }

  // 40% chance to intentionally skip blocking obvious wins to keep this mode beatable.
  const missBlock = rng() < 0.4;
  if (!missBlock) {
    const criticalSquares = findCriticalSquares(squares, PLAYERS.X);
    if (criticalSquares.length > 0) {
      return criticalSquares[0];
    }
  }

  const randomIndex = Math.floor(rng() * emptyIndices.length);
  return emptyIndices[randomIndex];
};
