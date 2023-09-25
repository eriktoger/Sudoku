import { ShowSolution } from "./Components/ShowSolution";
import { useAppStore } from "./store";
import { ChooseDifficulty } from "./Components/ChooseDifficulty";
import { DisplayBoard } from "./Components/DisplayBoard";

import { DisplayAlternatives } from "./Components/DisplayAlternatives";
import { useEffect, useState } from "react";

function App() {
  const visualBoard = useAppStore((state) => state.visualBoard);
  const gameOver = useAppStore((state) => state.gameOver);
  const [loadingMessage, setLoadingMessage] = useState(
    "Backend is warming up..."
  );
  useEffect(() => {
    const url = import.meta.env.VITE_BACKEND_URL;

    fetch(`${url}/0`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(() => {
        setLoadingMessage("");
      })
      .catch(() => {
        setLoadingMessage("Backend failed, refresh to try again.");
      });
  }, []);

  if (loadingMessage) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>{loadingMessage}</h1>
      </div>
    );
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Sudoku!</h1>
      <div style={{ height: 40 }}>
        {(!visualBoard || gameOver) && <ChooseDifficulty />}
      </div>
      {visualBoard && <DisplayBoard />}
      <DisplayAlternatives />
      {!gameOver && <ShowSolution />}
    </div>
  );
}

export default App;
