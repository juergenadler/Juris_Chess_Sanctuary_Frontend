// MoveControls.jsx

// MoveControls component is responsible for rendering the buttons that allow the user to navigate through the moves of the game.

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

import { Chess } from 'chess.js';
import { useChessContext } from '../context/ChessContext.jsx'; 
import './MoveControls.css';

const MoveControls = () => {
  const { moveCursor, movesListLAN, setPosition, setMoveCursor } = useChessContext(); 

  const updateBoardPosition = (index) => {
    const gameCopy = new Chess();
    for (let i = 0; i < index; i++) {
      gameCopy.move(movesListLAN[i]);
    }
    setPosition(gameCopy.fen());
    setMoveCursor(index);
  };

  const goToBeginning = () => {
    updateBoardPosition(0);
  };

  const goBackward = () => {
    if (moveCursor > 0) {
      updateBoardPosition(moveCursor - 1);
    }
  };

  const goForward = () => {
    if (moveCursor < movesListLAN.length) {
      updateBoardPosition(moveCursor + 1);
    }
  };

  const goToEnd = () => {
    updateBoardPosition(movesListLAN.length);
  };

  const gotoMoveByIndex = (index) => {
    if (index >= 0 && index <= movesListLAN.length) {
      updateBoardPosition(index);
    }
  };

  return (
    <div className="move-controls">
      <button onClick={goToBeginning} className="button-style" disabled={moveCursor === 0}>
        <FontAwesomeIcon icon={faStepBackward} className="text-2xl" />
      </button>
      <button onClick={goBackward} className="button-style" disabled={moveCursor === 0}>
        <FontAwesomeIcon icon={faBackward} className="text-2xl" />
      </button>
      <button onClick={goForward} className="button-style" disabled={moveCursor >= movesListLAN.length}>
        <FontAwesomeIcon icon={faForward} className="text-2xl" />
      </button>
      <button onClick={goToEnd} className="button-style" disabled={moveCursor >= movesListLAN.length}>
        <FontAwesomeIcon icon={faStepForward} className="text-2xl" />
      </button>
    </div>
  );
};

export default MoveControls;
