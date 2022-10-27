import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "./Cards";
import GameOver from "./GameOver";
import "./styles.css";

const GameBoard = () => {
  // card image assembler

  const cards = [
    "brainstorm",
    "brainstorm",
    "deathrite-shaman",
    "deathrite-shaman",
    "demonic-tutor",
    "demonic-tutor",
    "jace-mind",
    "jace-mind",
    "oko-theif",
    "oko-theif",
    "tezzeret",
    "tezzeret",
  ];

  // HELPER FUNCTION shuffle the list

  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  // SETUP set state randomize list of cards by name and index. default flipped and matched false

  const [cardList, setCardList] = useState(
    shuffle(cards).map((name, index) => {
      return {
        id: index,
        name: name,
        flipped: false,
        matched: false,
      };
    })
  );

  const [flippedCards, setFlippedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // GAME LOGIC

  const handleClick = (name, index) => {
    let currentCard = {
      name,
      index,
    };

    //update card is flipped
    let updateCards = cardList.map((card) => {
      if (card.id === index) {
        card.flipped = true;
      }
      return card;
    });
    let updateFlipped = flippedCards;
    updateFlipped.push(currentCard);
    setFlippedCards(updateFlipped);
    setCardList(updateCards);

    //if 2 cards are flipped, check if they are a match
    if (flippedCards.length === 2) {
      setTimeout(() => {
        check();
      }, 750);
    }
  };

  // logic to check card matches

  const check = () => {
    let updateCards = cardList;
    if (
      flippedCards[0].name === flippedCards[1].name &&
      flippedCards[0].index !== flippedCards[1].index
    ) {
      updateCards[flippedCards[0].index].matched = true;
      updateCards[flippedCards[1].index].matched = true;
      isGameOver();
    } else {
      updateCards[flippedCards[0].index].flipped = false;
      updateCards[flippedCards[1].index].flipped = false;
    }
    setCardList(updateCards);
    setFlippedCards([]);
  };

  // all cards matched
  const isGameOver = () => {
    let done = true;
    cardList.forEach((card) => {
      if (!card.matched) done = false;
    });
    setGameOver(done);
  };

  // RESTART - REDO SETUP
  const restartGame = () => {
    setCardList(
      shuffle(cards).map((name, index) => {
        return {
          id: index,
          name: name,
          flipped: false,
          matched: false,
        };
      })
    );

    setFlippedCards([]);
    setGameOver(false);
  };

  //  DISPLAY

  return (
    <Container
      fluid="md"
      className="board-wrapper-scroll-y"
      style={{
        padding: "25px",
        backgroundImage: `url(https://media.magic.wizards.com/images/wallpaper/the_five_dragons-sl-background-1280x960.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "center",
        backgroundSize: "auto",
        height: "100%",
      }}
    >
      <div className="game-board my-board-scrollbar">
        {!gameOver &&
          cardList.map((card, index) => (
            <Card
              key={index}
              id={index}
              name={card.name}
              flipped={card.flipped}
              matched={card.matched}
              clicked={flippedCards.length === 2 ? () => {} : handleClick}
            />
          ))}
        {gameOver && <GameOver restartGame={restartGame} />}
      </div>
    </Container>
  );
};

export default GameBoard;
