import React, { useCallback, useEffect, useMemo, useState } from "react";
import Board from "./Board";
import GameInfo from "./GameInfo";
import {
  PLAYERS,
  createInitialBoard,
  evaluateBoard,
  makeMove,
} from "../utils/gameLogic";
import { getEasyAIMove, getHardAIMove } from "../utils/ai";

const DIFFICULTY = {
  EASY: "easy",
  HARD: "hard",
};

const SCORE_STORAGE_KEY = "tic-tac-toe-scores-v1";

const defaultScores = {
  wins: 0,
  losses: 0,
  draws: 0,
  streak: { type: null, count: 0 },
};

const createInitialMetrics = () => ({
  positionsEvaluated: 0,
  thinkingTimeMs: 0,
});

const getTimestamp = () =>
  typeof performance !== "undefined" && typeof performance.now === "function"
    ? performance.now()
    : Date.now();

const loadScores = () => {
  if (typeof window === "undefined") {
    return {
      ...defaultScores,
      streak: { ...defaultScores.streak },
    };
  }

  try {
    const stored = window.localStorage.getItem(SCORE_STORAGE_KEY);
    if (!stored) {
      return {
        ...defaultScores,
        streak: { ...defaultScores.streak },
      };
    }
    const parsed = JSON.parse(stored);
    return {
      ...defaultScores,
      ...parsed,
      streak: {
        ...defaultScores.streak,
        ...(parsed?.streak ?? {}),
      },
    };
  } catch (error) {
    console.warn("Unable to load stored scores", error);
    return {
      ...defaultScores,
      streak: { ...defaultScores.streak },
    };
  }
};

const updateScoresWithOutcome = (scores, winner, isDraw) => {
  const nextScores = {
    wins: scores.wins,
    losses: scores.losses,
    draws: scores.draws,
    streak: { ...scores.streak },
  };

  let streakType = "draw";

  if (isDraw) {
    nextScores.draws += 1;
    streakType = "draw";
  } else if (winner === PLAYERS.X) {
    nextScores.wins += 1;
    streakType = "player";
  } else if (winner === PLAYERS.O) {
    nextScores.losses += 1;
    streakType = "ai";
  }

  if (nextScores.streak.type === streakType) {
    nextScores.streak.count += 1;
  } else {
    nextScores.streak.type = streakType;
    nextScores.streak.count = 1;
  }

  return nextScores;
};

const Game = () => {
  const [board, setBoard] = useState(createInitialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(PLAYERS.X);
  const [difficulty, setDifficulty] = useState(DIFFICULTY.HARD);
  const [scores, setScores] = useState(loadScores);
  const [aiMetrics, setAiMetrics] = useState(createInitialMetrics);
  const [resultRecorded, setResultRecorded] = useState(false);

  const evaluation = useMemo(() => evaluateBoard(board), [board]);
  const isPlayerTurn = currentPlayer === PLAYERS.X;

  useEffect(() => {
    if (evaluation.isComplete && !resultRecorded) {
      setScores((previous) =>
        updateScoresWithOutcome(previous, evaluation.winner, evaluation.isDraw)
      );
      setResultRecorded(true);
    }
  }, [evaluation, resultRecorded]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    if (currentPlayer !== PLAYERS.O || evaluation.isComplete) {
      return undefined;
    }

    const timer = setTimeout(() => {
      const startTime = getTimestamp();

      if (difficulty === DIFFICULTY.HARD) {
        const decision = getHardAIMove(board, PLAYERS.O, {
          onEvaluateMove: ({ index, score }) => {
            console.info(`[Hard AI] move ${index} evaluated with score ${score}`);
          },
        });

        const thinkingTimeMs = Math.round(getTimestamp() - startTime);

        if (decision && typeof decision.index === "number") {
          setBoard((previousBoard) => {
            if (previousBoard[decision.index]) {
              return previousBoard;
            }
            return makeMove(previousBoard, decision.index, PLAYERS.O);
          });
        }

        setAiMetrics({
          positionsEvaluated: decision?.positionsEvaluated ?? 0,
          thinkingTimeMs,
        });
      } else {
        const index = getEasyAIMove(board);
        const thinkingTimeMs = Math.round(getTimestamp() - startTime);

        if (typeof index === "number") {
          setBoard((previousBoard) => {
            if (previousBoard[index]) {
              return previousBoard;
            }
            return makeMove(previousBoard, index, PLAYERS.O);
          });
        }

        setAiMetrics({
          positionsEvaluated: 0,
          thinkingTimeMs,
        });
      }

      setCurrentPlayer(PLAYERS.X);
    }, 400);

    return () => clearTimeout(timer);
  }, [board, currentPlayer, difficulty, evaluation.isComplete]);

  const handleSquareSelect = useCallback(
    (index) => {
      if (
        !isPlayerTurn ||
        evaluation.isComplete ||
        board[index]
      ) {
        return;
      }

      const nextBoard = makeMove(board, index, PLAYERS.X);
      setBoard(nextBoard);
      setCurrentPlayer(PLAYERS.O);
      setAiMetrics(createInitialMetrics());
      setResultRecorded(false);
    },
    [board, evaluation.isComplete, isPlayerTurn]
  );

  const handleNewGame = useCallback(() => {
    setBoard(createInitialBoard());
    setCurrentPlayer(PLAYERS.X);
    setAiMetrics(createInitialMetrics());
    setResultRecorded(false);
  }, []);

  const handleResetScores = useCallback(() => {
    setScores({
      ...defaultScores,
      streak: { ...defaultScores.streak },
    });
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(SCORE_STORAGE_KEY);
    }
  }, []);

  const handleDifficultyChange = useCallback(
    (nextDifficulty) => {
      setDifficulty(nextDifficulty);
      handleNewGame();
    },
    [handleNewGame]
  );

  const statusMessage = evaluation.isComplete
    ? evaluation.isDraw
      ? "Draw game!"
      : evaluation.winner === PLAYERS.X
      ? "You win!"
      : "AI wins!"
    : isPlayerTurn
    ? "Your move"
    : "AI is thinking...";

  const currentTurnLabel = evaluation.isComplete
    ? evaluation.isDraw
      ? "No turns left"
      : `Winner: ${
          evaluation.winner === PLAYERS.X ? "Player (X)" : "AI (O)"
        }`
    : `Next: ${isPlayerTurn ? "Player (X)" : "AI (O)"}`;

  return (
    <div className="game-layout">
      <GameInfo
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        onNewGame={handleNewGame}
        onResetScores={handleResetScores}
        scores={scores}
        statusMessage={statusMessage}
        currentTurnLabel={currentTurnLabel}
        streak={scores.streak}
        aiMetrics={aiMetrics}
      />
      <div className="game-board-wrapper">
        <Board
          squares={board}
          onSquareSelect={handleSquareSelect}
          highlightedSquares={evaluation.winningLine ?? []}
          disabled={evaluation.isComplete || !isPlayerTurn}
        />
      </div>
    </div>
  );
};

export default Game;
