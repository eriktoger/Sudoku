import { useEffect, useState } from "react";
import { Cell } from "./Cell";

type Board = Number[][];

const boardIndicies = [...Array(81).keys()];

const BORDER_STYLE = "2px solid blue";
const DEFAULT_BORDER_STYLE = "1px solid lightgray";
const calcBorderStyle = (rowIndex: number, columnIndex: number) => {
  const borderStyle = {
    borderTop: DEFAULT_BORDER_STYLE,
    borderBottom: DEFAULT_BORDER_STYLE,
    borderRight: DEFAULT_BORDER_STYLE,
    borderLeft: DEFAULT_BORDER_STYLE,
  };

  if (rowIndex === 0 || rowIndex === 3 || rowIndex === 6) {
    borderStyle.borderTop = BORDER_STYLE;
  }
  if (rowIndex === 8) {
    borderStyle.borderBottom = BORDER_STYLE;
  }
  if (rowIndex === 2 || rowIndex === 5) {
    borderStyle.borderBottom = "";
  }

  if (columnIndex == 0 || columnIndex === 3 || columnIndex === 6) {
    borderStyle.borderLeft = BORDER_STYLE;
  }
  if (columnIndex === 2 || columnIndex === 5) {
    borderStyle.borderRight = "";
  }

  if (columnIndex == 8) {
    borderStyle.borderRight = BORDER_STYLE;
  }

  return borderStyle;
};
function App() {
  const [board, setBoard] = useState<Board | null>(null);
  const [maskedBoard, setMaskedBoard] = useState<Board | null>(null);
  const [visualBoard, setVisualBoard] = useState<Board | null>(null);
  useEffect(() => {
    fetch("https://localhost:7096/sudoku", {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      response.json().then((data) => {
        const maskingIndicies = [...boardIndicies]
          .sort(() => Math.random() - 0.5)
          .slice(0, 30);
        const newBoard = JSON.parse(JSON.stringify(data));
        for (const maskingIndex of maskingIndicies) {
          const row = Math.floor(maskingIndex / 9);
          const col = maskingIndex - row * 9;
          newBoard[row][col] = 0;
        }
        setMaskedBoard(newBoard);
        setVisualBoard(newBoard);
        setBoard(data);
      });
    });
  }, []);
  console.log({ board }, 1);
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
              return (
                <Cell
                  content={item.toString()}
                  isEditable={maskedBoard?.[rowIndex][columnIndex] === 0}
                  suggestions={[1, 2, 3]}
                  borderStyle={borderStyle}
                />
              );
            });
          })}
        </div>
      )}
    </div>
  );
}

export default App;
