import { useEffect, useState } from "react";
import "./App.css";
import { words } from "./words.tsx";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [definition, setDefinition] = useState("");
  const [hasWon, setHasWon] = useState(false);
  const [isInfoVisable, setIsInfoVisable] = useState(false);
  const [isAboutVisable, setIsAboutVisable] = useState(false);

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

  const showInfo = () => {
    setIsInfoVisable(true);
  };

  const closeInfo = () => {
    setIsInfoVisable(false);
  };

  const showAbout = () => {
    setIsAboutVisable(true);
  };

  const closeAbout = () => {
    setIsAboutVisable(false);
  };

  return (
    <>
      <div className="navbar">
        <div className="nav-title">Wordle Clone</div>
        <div className="nav-menu">
          <ul>
            <li>
              <button onClick={showInfo}>Info</button>
            </li>
            <li>
              <button onClick={showAbout}>About Me</button>
            </li>
            <li>
              <button>Hugo</button>
            </li>
          </ul>
        </div>
      </div>
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
        <Info isInfoVisable={isInfoVisable} closeInfo={closeInfo} />
        <About isAboutVisable={isAboutVisable} closeAbout={closeAbout} />
      </div>
    </>
  );
}

function Info({ isInfoVisable, closeInfo }: any) {
  if (isInfoVisable) {
    return (
      <div className="popup">
        <div className="popup-header">
          <h3>Info</h3>
          <button onClick={closeInfo}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <p>
          This game is a clone of the classic game Wordle, created by The New
          York Times. I do not claim any rights to the original game. This app
          has been created solely for educational purposes.
        </p>
        <p>
          This app uses the public API https://dictionaryapi.dev/ for fetching
          definitions of words.
        </p>
      </div>
    );
  }
}

function About({ isAboutVisable, closeAbout }: any) {
  if (isAboutVisable) {
    return (
      <div className="popup">
        <div className="popup-header">
          <h3>Hi, my name is Hugo!</h3>
          <button onClick={closeAbout}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <p>
          I'm a software engineer from Sweden with a passion for quizzes and
          puzzle games. My career started as a music producer where I developed
          an interest in software developement. In 2024, I graduated Lund
          University with a Bachelors Degree in Design of Information Systems.
        </p>
        <p>
          Feel free to visit my portfolio website to see more of my projects.
        </p>
      </div>
    );
  }
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
