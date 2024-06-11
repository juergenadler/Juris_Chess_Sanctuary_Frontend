import React from 'react';
import './App.css';

import { EnvProvider } from './context/EnvContext.jsx';
import { ChessProvider } from './context/ChessContext.jsx';

import MoveControls from './components/MoveControls.jsx';
import ChessboardComponent from './components/ChessBoard.jsx';
import EngineOutput from './components/EngineOutput.jsx';


const App = () => {
  return (
    <div className="app-container flex">
      <div className="w-1/2 flex flex-col items-stretch">
        <ChessProvider>
          <ChessboardComponent />
          <MoveControls />
        </ChessProvider>
        <EnvProvider>
          <EngineOutput />
        </EnvProvider>
      </div>
      <div className="right-half w-1/2">

      </div>
    </div>
  );
}

export default App;
