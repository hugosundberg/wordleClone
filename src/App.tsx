import { useEffect, useState } from "react";
import "./App.css";
import { words } from "./words.tsx";

export default function App() {
  const exampleWords = [words];
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    const handleTyping = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        return;
      }

      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      setCurrentGuess(currentGuess + event.key);
    };

    window.addEventListener("keydown", handleTyping);

    return () => {
      window.removeEventListener("keydown", handleTyping);
    };
  }, [currentGuess]);
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
