import React from "react";
import Square from "./Square";

const Board = ({
  squares,
  onSquareSelect,
  highlightedSquares = [],
  disabled = false,
}) => {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          isHighlighted={highlightedSquares.includes(index)}
          onClick={() => onSquareSelect(index)}
          disabled={disabled || Boolean(value)}
        />
      ))}
    </div>
  );
};

export default Board;
