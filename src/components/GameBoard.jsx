import Card from "./Card";

function GameBoard({ cards, handleClick }) {
  return (
    <div id="gameBoard">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}

export default GameBoard;