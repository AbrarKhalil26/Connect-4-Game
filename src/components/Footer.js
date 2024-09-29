import React from "react";
import { GAME_STATE } from "./Constants";

const Footer = ({ onNewGameClick, onSuggestClick, gameState }) => {
  return (
    <div className="footer panel header">
      {gameState !== GAME_STATE.PLAYING ? (
        <button onClick={onNewGameClick}>New Game</button>
      ) : (
        <button onClick={onSuggestClick}>Suggest</button>
      )}
    </div>
  );
};

export default Footer;
