function App() {
  const handleKeyDown = (event: { key: any }) => {
    // Logs the key that was pressed
    console.log(`Key pressed: ${event.key}`);
  };

  return (
    <>
      <div className="game-body">
        <h1>Wordle Clone</h1>
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

export default App;
