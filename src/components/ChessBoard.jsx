// Chessboard.jsx 
//
// is a component that displays a chessboard and allows the user to play chess.
// It uses the react - chessboard library to render the chessboard and the chess.js library to handle the game logic. 
// The component also uses the ChessContext to manage the game state and update the board position based on the moves made by the user.

import { useEffect } from "react";

import { useChessContext } from '../context/ChessContext.jsx';

import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessboardComponent = () => {
  const {
    position, setPosition,
    game, setGame,
    movesListLAN, setMovesListLAN,
    movesListPGN, setMovesListPGN,
    moveCursor, setMoveCursor,
  } = useChessContext();

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
    </div>
  );
};

export default ChessboardComponent;
