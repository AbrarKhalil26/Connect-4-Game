import React from 'react'
import { GAME_STATE } from './Constants';

const Header = ({ gameStatus, player, winner }) => {
  const renderLabel = () => {
    switch (gameStatus) {
      case GAME_STATE.PLAYING:
        return <p>Player {player} Turn</p>;
      case GAME_STATE.WINNER:
        return `Player ${winner} Wins!`;
      case GAME_STATE.DRAW:
        return 'Game is a Draw!';
      default:
        return '';
    }
  }

  return (
    <div className='panel header'>
      <div className='header-text'>{renderLabel()}</div>
    </div>
  )
}

export default Header
