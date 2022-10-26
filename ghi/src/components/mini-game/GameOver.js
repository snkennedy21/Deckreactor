import React from "react";
import Button from "react-bootstrap/Button";

const GameOver = ({ restartGame }) => {
  return (
    <div className="centered">
      <Button variant="danger" onClick={restartGame}> 
        Play Again?
      </Button>
    </div>
  );
};

export default GameOver;