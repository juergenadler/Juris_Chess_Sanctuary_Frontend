

import React, { createContext, useContext, useState } from 'react';

import { Chess } from 'chess.js';

const ChessContext = createContext();

export const useChessContext = () => useContext(ChessContext);

export const ChessProvider = ({ children }) => {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const [moveCursor, setMoveCursor] = useState(0);
  const [movesListLAN, setMovesListLAN] = useState([]);
  const [movesListPGN, setMovesListPGN] = useState([]);

  const contextValue = {
    game,
    position,
    moveCursor,
    movesListLAN,
    movesListPGN,
    setGame,
    setPosition,
    setMoveCursor,
    setMovesListLAN,
    setMovesListPGN,
  };

  return <ChessContext.Provider value={contextValue}>{children}</ChessContext.Provider>;
};
