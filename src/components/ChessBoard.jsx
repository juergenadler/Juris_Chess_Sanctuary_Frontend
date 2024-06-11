import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import './ChessBoard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

const ChessboardComponent = () => {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const [moveCursor, setMoveCursor] = useState(0);
  const [movesListLAN, setMovesListLAN] = useState([]);
  const [movesListPGN, setMovesListPGN] = useState([]);

  // "Misusing" useEffect() to log the values of some state variables as it is called after every render.
  // Reason: State updates are asynchronous, so the console.log() statements would be misplaced in OnDrop()
  // where the state updates are being triggered, but the state no actually updated.
  useEffect(() => {
    console.log("movesListLAN", movesListLAN);
    console.log("movesListPGN", movesListPGN);
    console.log("moveCursor", moveCursor);
  }, [movesListLAN, movesListPGN, moveCursor]);

  const onDrop = (sourceSquare, targetSquare, piece) => {
    try {
      const gameCopy = new Chess(game.fen());

      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase(), // Convert to lowercase, we get something like "wb" or "bq"
      });

      if (move) {
        const moveLAN = gameCopy.history({ verbose: true }).pop().lan;
        const movePGN = gameCopy.history({ verbose: true }).pop().san;

        setGame(gameCopy);
        setPosition(gameCopy.fen());
        setMoveCursor(prevMoveCursor => {
          const newMoveCursor = prevMoveCursor + 1;
          setMovesListLAN(prevMoves => [...prevMoves.slice(0, prevMoveCursor), moveLAN]);
          setMovesListPGN(prevMoves => [...prevMoves.slice(0, prevMoveCursor), movePGN]);
          return newMoveCursor;
        });
      }
    } catch (error) {
      console.error("An error occurred during the move:", error);
    }
  };

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
    <div className="chessboard-container">
      <div className="chessboard-wrapper">
        <Chessboard
          position={position}
          onPieceDrop={(sourceSquare, targetSquare, piece) => onDrop(sourceSquare, targetSquare, piece)}
          onPromotion={(piece) => onDrop(null, null, piece)} // Capture promotion piece
          boardWidth={window.innerWidth / 2 - 20}
        />
      </div>
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
    </div>
  );
};

export default ChessboardComponent;
