import { useEffect, useState } from "react";
import "./App.css";
import { words } from "./words.tsx";

export default function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [definition, setDefinition] = useState("");
  const [hasWon, setHasWon] = useState(false);

  // Initialize a new game
  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setSolution(words[randomIndex].toLowerCase());
    setGuesses(Array(6).fill(null));
    setCurrentGuess("");
    setIsGameOver(false);
    setCurrentRow(0);
    setDefinition("");
  };

  console.log(solution);

  useEffect(() => {
    startNewGame(); // Starts the game when the component is first loaded
  }, []);

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
        newGuesses[currentRow] = currentGuess;
        setGuesses(newGuesses);
        setCurrentRow((prev) => prev + 1);

        if (currentGuess === solution) {
          setIsGameOver(true);
          setHasWon(true);
        } else if (currentRow === 5) {
          setIsGameOver(true);
        }

        setCurrentGuess("");
      }

      if (event.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handleTyping);

    return () => {
      window.removeEventListener("keydown", handleTyping);
    };
  }, [currentGuess, guesses, isGameOver, solution, currentRow]);

  return (
    <>
      <div className="game-body">
        <h1>Wordle Clone</h1>
        {guesses.map((guess, i) => (
          <Row
            guess={i === currentRow ? currentGuess : guess ?? ""}
            key={i}
            solution={solution}
            isFinal={i < currentRow}
          />
        ))}
        <Solution isGameOver={isGameOver} solution={solution} hasWon={hasWon} />
        <Buttons
          isGameOver={isGameOver}
          solution={solution}
          definition={definition}
          setDefinition={setDefinition}
          startNewGame={startNewGame}
          hasWon={hasWon}
        />
      </div>
    </>
  );
}

function Solution({ solution, isGameOver, hasWon }: any) {
  if (isGameOver && hasWon) {
    return <h2 className="solution">Congratulations!</h2>;
  } else if (isGameOver) {
    return <h2 className="solution">Solution: {solution}</h2>;
  }
}

function Buttons({
  isGameOver,
  solution,
  definition,
  setDefinition,
  startNewGame,
}: any) {
  const showDefinition = async () => {
    try {
      const res = await fetch(
        "https://api.dictionaryapi.dev/api/v2/entries/en/" + solution
      );

      if (!res.ok) {
        throw new Error(`Error fetching definition: ${res.statusText}`);
      }

      const data = await res.json();
      const fetchedDefinition =
        data[0]?.meanings[0]?.definitions[0]?.definition ||
        "Definition not found";

      setDefinition(fetchedDefinition);
    } catch (error) {
      console.error("Failed to fetch the definition: ", error);
      setDefinition("Definition not found");
    }
  };

  if (isGameOver) {
    return (
      <>
        <button onClick={showDefinition} className="button">
          Show Definition
        </button>
        {definition && <p className="definition">Definition: {definition}</p>}
        <button onClick={startNewGame} className="button">
          Try Again
        </button>
      </>
    );
  }

  return null;
}

function Row({ guess = "", solution, isFinal }: any) {
  const tiles = [];

  for (let i = 0; i < 5; i++) {
    let className = "tile";

    if (isFinal) {
      if (guess[i] === solution[i]) {
        className = "tile correct";
      } else if (solution.includes(guess[i])) {
        className = "tile close";
      } else {
        className = "tile absent";
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
