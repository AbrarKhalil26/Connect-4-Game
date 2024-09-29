import React, { useEffect, useState } from "react";
import GameCircle from "./GameCircle";
import Header from "./Header";
import Footer from "./Footer";
import { getComputerMove, isDraw, isWinner } from "../helper";
import { GAME_STATE, NO_CIRCLES, Player } from "./Constants";


const GameBoard = () => {
  const [gameState, setGameState] = useState(Array(NO_CIRCLES).fill(Player.NONE));
  const [currentPlayer, setCurrentPlayer] = useState(Player.PLAYER1);
  const [gameStatus, setGameStatus] = useState(GAME_STATE.PLAYING);
  const [winner, setWinner] = useState(Player.NONE);

  useEffect(() => {
    initGame();
  },[])

  const initGame = () => {
    setGameState(Array(NO_CIRCLES).fill(Player.NONE));
    setCurrentPlayer(Player.PLAYER1);
    setGameStatus(GAME_STATE.PLAYING);
    setWinner(Player.NONE);
  }

  const suggest = () => {
    const suggestedMove = getComputerMove(gameState);
    if (suggestedMove !== undefined) {
      onCircleClicked(suggestedMove);
    }
  };

  const initBoard = () => {
    const circles = [];
    for (let i = 0; i < 16; i++) {
      circles.push(renderCircle(i));
    }
    return circles;
  };

  const onCircleClicked = (id) => {
    if (gameState[id] !== Player.NONE || gameStatus !== GAME_STATE.PLAYING) return;

    if (isWinner(gameState, id, currentPlayer)) {
      setGameStatus(GAME_STATE.WINNER);
      setWinner(currentPlayer);
    }

    if(isDraw(gameState, id, currentPlayer)) {
      setGameStatus(GAME_STATE.DRAW);
      setWinner(Player.NONE);
    }

    setGameState((prevState) => {
      return prevState.map((value, index) => {
        if (index === id) return currentPlayer;
        return value;
      });
    });
    
    setCurrentPlayer(currentPlayer === Player.PLAYER1 ? Player.PLAYER2 : Player.PLAYER1);
  };

  const renderCircle = (id) => {
    return (
      <GameCircle
        key={id}
        id={id}
        onCircleClicked={() => onCircleClicked(id)}
        className={`player_${gameState[id]}`}
      />
    );
  };

  return (
    <>
      <Header gameStatus={gameStatus} player={currentPlayer} winner={winner}/>
      <div className="gameBoard">
        {initBoard()}
      </div>
      <Footer onNewGameClick={() => initGame()} onSuggestClick={() => suggest()} gameState={gameStatus}/>
    </>
  );
};

export default GameBoard;
