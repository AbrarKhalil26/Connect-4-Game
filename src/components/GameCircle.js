import React from "react";

const GameCircle = ({ id, className, children, onCircleClicked }) => {
  return (
    <div
      className={`gameCircle ${className ? className:'player_0'}`}
      onClick={onCircleClicked}
    >
      {children}
    </div>
  );
};

export default GameCircle;
