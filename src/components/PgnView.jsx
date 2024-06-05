import React from 'react';

const PgnView = ({ history }) => {
  return (
    <div className="pgn-view">
      <textarea
        className="pgn-textarea"
        value={"History"}
        readOnly
      />
    </div>
  );
};

const generatePGN = (history) => {
  if (!history || !Array.isArray(history)) {
    return ''; // Return an empty string if history is not valid
  }

  return history.map((move, index) => {
    const moveNumber = Math.floor(index / 2) + 1;
    return `${moveNumber}. ${move}`;
  }).join(' ');
};

export default PgnView;
