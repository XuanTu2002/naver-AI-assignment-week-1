import React from "react";

const difficultyLabels = {
  easy: "Easy",
  hard: "Hard",
};

const streakLabels = {
  player: "Player wins",
  ai: "AI wins",
  draw: "Draws",
  null: "None",
};

const GameInfo = ({
  difficulty,
  onDifficultyChange,
  onNewGame,
  onResetScores,
  scores,
  statusMessage,
  currentTurnLabel,
  streak,
  aiMetrics,
}) => {
  const streakKey = streak?.type ?? null;
  const streakCount = streak?.count ?? 0;
  const streakDescription =
    streakKey && streakKey !== null
      ? `${streakCount} ${streakLabels[streakKey]}`
      : "No active streak";

  const positionsEvaluatedLabel =
    difficulty === "hard" ? aiMetrics.positionsEvaluated : "N/A";

  return (
    <aside className="game-info">
      <div className="game-info__section">
        <h2 className="game-info__headline">{statusMessage}</h2>
        <p className="game-info__turn">{currentTurnLabel}</p>
      </div>

      <div className="game-info__section">
        <label className="game-info__label" htmlFor="difficulty">
          Difficulty
        </label>
        <select
          id="difficulty"
          className="game-info__select"
          value={difficulty}
          onChange={(event) => onDifficultyChange(event.target.value)}
        >
          {Object.entries(difficultyLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="game-info__actions">
        <button type="button" className="btn" onClick={onNewGame}>
          New Game
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={onResetScores}
        >
          Reset Scores
        </button>
      </div>

      <div className="game-info__section">
        <h3 className="game-info__subheading">Scoreboard</h3>
        <ul className="game-info__stats">
          <li>
            <strong>Player Wins:</strong> {scores.wins}
          </li>
          <li>
            <strong>AI Wins:</strong> {scores.losses}
          </li>
          <li>
            <strong>Draws:</strong> {scores.draws}
          </li>
        </ul>
        <p className="game-info__streak">
          <strong>Current streak:</strong> {streakDescription}
        </p>
      </div>

      <div className="game-info__section">
        <h3 className="game-info__subheading">AI Metrics</h3>
        <p>
          <strong>Positions evaluated:</strong> {positionsEvaluatedLabel}
        </p>
        <p>
          <strong>Thinking time:</strong> {aiMetrics.thinkingTimeMs} ms
        </p>
      </div>
    </aside>
  );
};

export default GameInfo;
