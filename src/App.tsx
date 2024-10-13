import { useEffect, useState } from "react";
import "./App.css";
import { words } from "./words.tsx";

export default function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentRow, setCurrentRow] = useState(0); // Track current row

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setSolution(words[randomIndex].toLowerCase());
  }, []);

  // Debugging logs
  console.log("Solution: " + solution);

  useEffect(() => {
    const handleTyping = (event: KeyboardEvent) => {
      if (isGameOver) return;

      if (/^[a-zA-Z]$/.test(event.key) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + event.key.toLowerCase());
      }

      if (event.key === "Enter") {
        if (currentGuess.length < 5) return;

        // Submit guess
        const newGuesses = [...guesses];
        newGuesses[currentRow] = currentGuess; // Finalize the guess for the current row
        setGuesses(newGuesses);
        setCurrentRow((prev) => prev + 1); // Move to the next row

        if (currentGuess === solution) {
          setIsGameOver(true);
        } else if (currentRow === 5) {
          setIsGameOver(true); // End game after 6th row
        }

        setCurrentGuess(""); // Clear current guess after submission
      }

      if (event.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1)); // Correct Backspace handling
      }
    };

    window.addEventListener("keydown", handleTyping);

    return () => {
      window.removeEventListener("keydown", handleTyping);
    };
  }, [currentGuess, guesses, isGameOver, solution, currentRow]);

  // Debugging logs
  console.log("Current guess: " + currentGuess);
  console.log("Is game over: " + isGameOver);

  return (
    <>
      <div className="game-body">
        <h1>Wordle Clone</h1>
        {guesses.map((guess, i) => (
          <Row
            guess={i === currentRow ? currentGuess : guess ?? ""}
            key={i}
            solution={solution}
            isFinal={i < currentRow} // Only final rows get the color class applied
          />
        ))}
      </div>
    </>
  );
}

function Row({ guess = "", solution, isFinal }: any) {
  const tiles = [];

  for (let i = 0; i < 5; i++) {
    let className = "tile";

    if (isFinal) {
      if (guess[i] === solution[i]) {
        className = "tile correct"; // Correct letter and position
      } else if (solution.includes(guess[i])) {
        className = "tile close"; // Correct letter, wrong position
      } else {
        className = "tile absent"; // Incorrect letter
      }
    }

    tiles.push(
      <div key={i} className={className}>
        {guess[i] || ""}
      </div>
    );
  }

  return <div className="row">{tiles}</div>;
}
