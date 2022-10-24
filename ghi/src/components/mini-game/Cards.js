import React from "react";


// assemble card 
const GameCard = ({ id, name, flipped, matched, clicked }) => {
  return (
    <div
      onClick={() => (flipped ? undefined : clicked(name, id))}
      className={
        "card" + (flipped ? " flipped" : "") + (matched ? " matched" : "")
      }
    >
      <div className="back">
      <img alt={name} src="/Back.jpeg"/>
      </div>
      <div className="front">
        <img alt={name} src={"/" + name + ".jpeg"} />
      </div>
    </div>
  );
};

export default GameCard;