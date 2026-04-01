import { fetchCards } from "./services/api";
import Scoreboard from "./components/Scoreboard";
import GameBoard from "./components/GameBoard";
import { useState, useEffect } from "react";
import "./styles/App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Create cards
  function createCards() {
    const newCards = [];
    for (let i = 1; i <= 16; i++) {
      newCards.push({ id: i });
    }
    return newCards;
  }

  // Shuffle cards
  function shuffleCards(array) {
    let newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  }

  // Runs once (like init)
 useEffect(() => {
  async function loadCards() {
    const data = await fetchCards();
    await new Promise(res => setTimeout(res,2000));
    setCards(shuffleCards(data));
    setLoading(false); // stop loading after data comes
  }

  loadCards();
}, []);

  // Handle click
  function handleClick(id) {
    if (clickedCards.includes(id)) {
      setScore(0);
      setClickedCards([]);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setClickedCards([...clickedCards, id]);

      if (newScore > bestScore) {
        setBestScore(newScore);
      }

      if (newScore === 16) {
        alert("You win!");
        setScore(0);
        setClickedCards([]);
      }
    }

    setCards(shuffleCards(cards));
  }

 return (
  <div>
    <h1>Memory Card Game</h1>

    {loading ? (
      <p>Loading cards...</p>
    ) : (
      <>
        <Scoreboard score={score} bestScore={bestScore} />
        <GameBoard cards={cards} handleClick={handleClick} />
      </>
    )}
  </div>
);
}

export default App;