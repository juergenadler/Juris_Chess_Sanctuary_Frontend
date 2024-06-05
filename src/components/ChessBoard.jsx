import React, { useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import axios from 'axios';

import './ChessBoard.css'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faForward, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'

const ChessboardComponent = () => {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const [moveIndex, setMoveIndex] = useState(0);

  const onDrop = (sourceSquare, targetSquare) => {
    try {
      console.log("OnDrop");
      const gameCopy = new Chess(game.fen()); // the pgn way of pgn = new Chess(); pgn.loadPgn(game.pgn()); runs into issues with the move function. Avoid load_pgn() function.

      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // always promote to queen for simplicity
      });

      //
      if (move === null) {
        // Currently with react-chessboard, I see that this condition is being handled by the library itself,
        // but in a way that it doesn't show any error message to the user (but to the developer)
        console.error("Invalid move from " + sourceSquare + " to " + targetSquare);
        return;
      }

      // TODO: Is this move is legal


      setGame(gameCopy);
      setPosition(gameCopy.fen());
      setMoveIndex(moveIndex + 1);
    } catch (error) {
      console.error("An error occurred during the move:", error);
    }
  };

  const goToBeginning = () => {
    const gameCopy = new Chess();
    setGame(gameCopy);
    setPosition(gameCopy.fen());
    setMoveIndex(0);
  };

  const goBackward = () => {
    if (moveIndex > 0) {
      console.log("Move index before going backward:", moveIndex);
      const history = game.history();
      console.log("Game history:", history);
      console.log("Move index - 1:", moveIndex - 1);
      console.log("Game history[moveIndex - 1]:", history[moveIndex - 1]);
      const moveNotation = history[moveIndex - 1];
      const move = game.move(moveNotation);
      if (move !== null) {
        setPosition(game.fen());
        setMoveIndex(moveIndex - 1);
      }
    }
  };
  

  const goForward = () => {
    if (moveIndex < game.history().length) {
      console.log("Game history before going forward:", game.history());
      const moveNotation = game.history()[moveIndex];
      const move = game.move(moveNotation);
      if (move !== null) {
        setPosition(game.fen());
        setMoveIndex(moveIndex + 1);
      }
    }
  };
  
  const goToEnd = () => {
    const gameCopy = new Chess();
    for (let i = 0; i < game.history().length; i++) {
      gameCopy.move(game.history()[i]);
    }
    setGame(gameCopy);
    setPosition(gameCopy.fen());
    setMoveIndex(game.history().length);
  };

  return (
    <div className="chessboard-container">
      <div className="chessboard-wrapper">
        <Chessboard
          position={position}
          onPieceDrop={(sourceSquare, targetSquare) => onDrop(sourceSquare, targetSquare)}
          boardWidth={window.innerWidth / 2 - 20} // Responsive width
        />
      </div>
      <div className="move-controls">
        <button onClick={goToBeginning} className="button-style">
          <FontAwesomeIcon icon={faStepBackward} className="text-2xl" />
        </button>
        <button onClick={goBackward} className="button-style">
          <FontAwesomeIcon icon={faBackward} className="text-2xl" />
        </button>
        <button onClick={goForward} className="button-style">
          <FontAwesomeIcon icon={faForward} className="text-2xl" />
        </button>
        <button onClick={goToEnd} className="button-style">
          <FontAwesomeIcon icon={faStepForward} className="text-2xl" />
        </button>
      </div>
    </div>
  );
}


  export default ChessboardComponent;