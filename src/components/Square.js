import React from "react";

const Square = ({ onClick, value, isHighlighted, disabled }) => {
  const buttonClass = `square${isHighlighted ? " square--highlight" : ""}`;

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {value}
    </button>
  );
};

export default Square;
