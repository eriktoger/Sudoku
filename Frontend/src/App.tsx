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
  useEffect(() => {
    fetch("https://localhost:7096/sudoku", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      response.json().then((data) => {
        const maskingIndicies = [...Array(81).keys()]
          .sort(() => Math.random() - 0.5)
          .slice(0, 30);
        const newBoard = JSON.parse(JSON.stringify(data));
        for (const maskingIndex of maskingIndicies) {
          const row = Math.floor(maskingIndex / 9);
          const col = maskingIndex - row * 9;
          newBoard[row][col] = 0;
        }
        setMaskedBoard(JSON.parse(JSON.stringify(newBoard)));
        setVisualBoard(JSON.parse(JSON.stringify(newBoard)));
        setBoard(data);
      });
    });
  }, []);
  console.log({ maskedBoard }, 1);
  return (
    <div>
      <h1>Sudoku!</h1>
      {!visualBoard && <div>Loading...</div>}
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
      {currentAlternatives.map((alternative, index) => (
        <div
          key={index}
          onClick={() => {
            setVisualBoard((current) => {
              if (!currentCell || !current) {
                return current;
              }
              current[currentCell.rowIndex][currentCell.columnIndex] =
                alternative;
              return current;
            });
            setCurrentCell(null);
            setCurrentAlternatives([]);
          }}
        >
          {alternative}
        </div>
      ))}
    </div>
  );
}

export default App;
