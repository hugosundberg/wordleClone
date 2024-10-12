import { useEffect, useState } from "react";
import "./App.css";
import { words } from "./words.tsx";

const BASE_URL = "https://api.frontendexpert.io/api/fe/wordle-words";

export default function App() {
  const exampleWords = [words];
  const [solution, setSolution] = useState("");

  return (
    <>
      <div className="game-body">
        <h1>Wordle Clone</h1>
        {solution}
        <div className="row">
          <div className="tile"></div>
          <div className="tile"></div>
          <div className="tile"></div>
          <div className="tile"></div>
          <div className="tile"></div>
        </div>
        <div className="row">
          <div className="tile"></div>
          <div className="tile"></div>
          <div className="tile"></div>
          <div className="tile"></div>
          <div className="tile"></div>
        </div>
        <div className="row">
          <div className="tile"></div>
          <div className="tile"></div>
          <div className="tile"></div>
          <div className="tile"></div>
          <div className="tile"></div>
        </div>
        <div className="row">
          <div className="tile"></div>
          <div className="tile"></div>
          <div className="tile"></div>
          <div className="tile"></div>
          <div className="tile"></div>
        </div>
        <div className="row">
          <div className="tile"></div>
          <div className="tile"></div>
          <div className="tile"></div>
          <div className="tile"></div>
          <div className="tile"></div>
        </div>
      </div>
    </>
  );
}
