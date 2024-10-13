import { useEffect, useState } from "react";
import "./App.css";
import { words } from "./words.tsx";

export default function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length - 1);
    setSolution(words[randomIndex].toLowerCase());
  }, []);

  // Displays randomly selected solution
  console.log(solution);

  useEffect(() => {
    const handleTyping = (event: KeyboardEvent) => {
      if (isGameOver) {
        return;
      }

      if (/^[a-zA-Z]$/.test(event.key)) {
        setCurrentGuess((previousGuess) => previousGuess + event.key);
      }

      if (event.key === "Enter") {
        if (currentGuess.length < 5) {
          return;
        }

        // Submit guess
        const newGuesses = [...guesses];
        const currentIndex = guesses.findIndex((val) => val == null);
        newGuesses[currentIndex] = currentGuess;
        setGuesses(newGuesses);

        if (currentGuess === solution) {
          setIsGameOver(true);
        } else if (currentIndex === 5) {
          setIsGameOver(true);
        }

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
  }, [currentGuess, guesses, isGameOver, solution]);

  // Debugging logs
  console.log("Current guess: " + currentGuess);
  console.log("Is game over: " + isGameOver);

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
        })}
      </div>
    </>
  );
}

function Row({ guess }: any) {
  const tiles = [];

  for (let i = 0; i < 5; i++) {
    tiles.push(
      <div key={i} className="tile">
        {guess[i] || ""}
      </div>
    );
  }

  return <div className="row">{tiles}</div>;
}
