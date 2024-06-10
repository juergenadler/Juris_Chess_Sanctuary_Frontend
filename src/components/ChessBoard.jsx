import React, { useState } from 'react';
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

  const onDrop = (sourceSquare, targetSquare) => {
    try {
      const gameCopy = new Chess(game.fen());

      let promotion = 'q'; // default promotion to queen
      if ((sourceSquare[1] === '7' && targetSquare[1] === '8') || (sourceSquare[1] === '2' && targetSquare[1] === '1')) {
        promotion = prompt("Choose promotion piece: q (queen), r (rook), b (bishop), n (knight)", "q");
        if (!['q', 'r', 'b', 'n'].includes(promotion)) {
          promotion = 'q'; // default to queen if invalid input
        }
      }

      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: promotion,
      });

      if (move) {
        const moveLAN = `${move.from}${move.to}${move.promotion ? move.promotion : ''}`.toLowerCase();
        const movePGN = gameCopy.history({ verbose: true }).pop().san;

        setGame(gameCopy);
        setPosition(gameCopy.fen());
        setMovesListLAN(prevMoves => [...prevMoves.slice(0, moveCursor), moveLAN]);
        setMovesListPGN(prevMoves => [...prevMoves.slice(0, moveCursor), movePGN]);
        setMoveCursor(moveCursor + 1);
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
          onPieceDrop={(sourceSquare, targetSquare) => onDrop(sourceSquare, targetSquare)}
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
