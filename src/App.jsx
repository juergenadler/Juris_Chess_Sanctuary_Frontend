import React from 'react';
import './App.css';
import ChessboardComponent from './components/ChessBoard.jsx';
import EngineOutput from './components/EngineOutput.jsx';

const App = () => {
  return (
    <div className="app-container flex">
      <div className="w-1/2 flex flex-col items-stretch">
        <ChessboardComponent />
        <EngineOutput />
      </div>
      <div className="right-half w-1/2">

      </div>
    </div>
  );
}

export default App;
