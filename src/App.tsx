import { useEffect, useState } from "react";
import "./App.css";
import { words } from "./words.tsx";

export default function App() {
  const exampleWords = [words];
  const [solution, setSolution] = useState("HELLO");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleTyping = (event: KeyboardEvent) => {
      if (isGameOver) {
        return;
      }

      if (/^[a-zA-Z]$/.test(event.key)) {
        setCurrentGuess(currentGuess + event.key);
      }

      if (event.key === "Enter") {
        if (currentGuess.length < 5) {
          return;
        }

        const isCorrect = solution === currentGuess;

        if (isCorrect) {
          setIsGameOver(true);
          return;
        }

        // Submit guess
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");
      }

      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      if (currentGuess.length >= 5) {
        return;
      }
    };

    window.addEventListener("keydown", handleTyping);

    return () => {
      window.removeEventListener("keydown", handleTyping);
    };
  }, [currentGuess, guesses]);

  let keyIndex = 0;

  return (
    <>
      <div className="game-body">
        <h1>Wordle Clone</h1>
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((val) => val == null);
          return (
            <Row
              guess={isCurrentGuess ? currentGuess : guess ?? ""}
              key={keyIndex++}
            />
          );
          {
            currentGuess;
          }
        })}
      </div>
    </>
  );
}

function Row({ guess }: any) {
  const tiles = [];

  for (let i = 0; i < 5; i++) {
    const character = guess[i];
    tiles.push(
      <div key={i} className="tile">
        {character}
      </div>
    );
  }

  return <div className="row">{tiles}</div>;
}
