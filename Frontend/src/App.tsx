import { useEffect, useState } from "react";
import { Cell } from "./Cell";
import { calcAlternatives, calcBorderStyle } from "./helpers";
import { Board, Coordinate } from "./types";

function App() {
  const [board, setBoard] = useState<Board | null>(null);
  const [maskedBoard, setMaskedBoard] = useState<Board | null>(null);
  const [visualBoard, setVisualBoard] = useState<Board | null>(null);
  const [currentAlternatives, setCurrentAlternatives] = useState<number[]>([]);
  const [currentCell, setCurrentCell] = useState<Coordinate | null>(null);
  const [gameOver, setGameOver] = useState(true);
  const [gameOverMessage, setGameOverMessage] = useState(
    "Choose a diffculty to start!"
  );

  const getBoard = (hiddenCells: number) => {
    fetch("https://localhost:7096/sudoku", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      response.json().then((data) => {
        const maskingIndicies = [...Array(81).keys()]
          .sort(() => Math.random() - 0.5)
          .slice(0, hiddenCells);
        const newBoard = JSON.parse(JSON.stringify(data));
        for (const maskingIndex of maskingIndicies) {
          const row = Math.floor(maskingIndex / 9);
          const col = maskingIndex - row * 9;
          newBoard[row][col] = 0;
        }
        setMaskedBoard(JSON.parse(JSON.stringify(newBoard)));
        setVisualBoard(JSON.parse(JSON.stringify(newBoard)));
        setBoard(data);
        setGameOver(false);
      });
    });
  };

  return (
    <div>
      <h1>Sudoku!</h1>
      {(!visualBoard || gameOver) && (
        <div>
          <span>{gameOverMessage}</span>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => getBoard(1)}>Test</button>
            <button onClick={() => getBoard(30)}>Easy</button>
            <button onClick={() => getBoard(45)}>Medium</button>
            <button onClick={() => getBoard(60)}>Hard</button>
          </div>
        </div>
      )}
      {visualBoard && (
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(9, 40px)" }}
        >
          {visualBoard.map((row, rowIndex) => {
            return row.map((item, columnIndex) => {
              const borderStyle = calcBorderStyle(rowIndex, columnIndex);
              const alternatives = calcAlternatives(
                visualBoard,
                rowIndex,
                columnIndex
              );
              return (
                <Cell
                  key={`${rowIndex}-${columnIndex}`}
                  content={item.toString()}
                  isEditable={maskedBoard?.[rowIndex][columnIndex] === 0}
                  alternatives={alternatives}
                  borderStyle={borderStyle}
                  setAlternatives={setCurrentAlternatives}
                  isSelected={
                    currentCell?.rowIndex === rowIndex &&
                    currentCell?.columnIndex === columnIndex
                  }
                  setCurrentCell={() =>
                    setCurrentCell({ rowIndex, columnIndex })
                  }
                />
              );
            });
          })}
        </div>
      )}
      <div style={{ display: "flex", gap: 10, margin: 10 }}>
        {currentAlternatives.map((alternative, index) => (
          <button
            key={index}
            onClick={() => {
              setVisualBoard((current) => {
                if (!currentCell || !current) {
                  return current;
                }
                current[currentCell.rowIndex][currentCell.columnIndex] =
                  alternative;
                const boardDone = !current.flat().some((num) => num === 0);

                if (boardDone) {
                  if (!gameOver) {
                    setGameOverMessage("Great you did it!");
                    setGameOver(true);
                  }
                }
                return current;
              });

              setCurrentCell(null);
              setCurrentAlternatives([]);
            }}
          >
            {alternative}
          </button>
        ))}

        {currentCell &&
          visualBoard?.[currentCell.rowIndex][currentCell.columnIndex] !==
            0 && (
            <button
              onClick={() => {
                setVisualBoard((current) => {
                  if (!currentCell || !current) {
                    return current;
                  }
                  current[currentCell.rowIndex][currentCell.columnIndex] = 0;
                  return current;
                });
                setCurrentCell(null);
                setCurrentAlternatives([]);
              }}
            >
              Reset
            </button>
          )}
      </div>
      {!gameOver && (
        <div style={{ width: 360, display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => {
              setVisualBoard(board);
              setGameOver(true);
              setGameOverMessage("Winners never quit, and quitters never win.");
            }}
          >
            I give up!
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
