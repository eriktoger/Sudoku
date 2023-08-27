import { ShowSolution } from "./Components/ShowSolution";
import { useAppStore } from "./store";
import { ChooseDifficulty } from "./Components/ChooseDifficulty";
import { DisplayBoard } from "./Components/DisplayBoard";

import { DisplayAlternatives } from "./Components/DisplayAlternatives";

function App() {
  const visualBoard = useAppStore((state) => state.visualBoard);
  const gameOver = useAppStore((state) => state.gameOver);

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
