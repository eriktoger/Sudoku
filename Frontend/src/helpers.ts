import { Board } from "./types";

const BORDER_STYLE = "2px solid blue";
const DEFAULT_BORDER_STYLE = "1px solid lightgray";

export const calcBorderStyle = (rowIndex: number, columnIndex: number) => {
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

export const findSquareCenter = (rowIndex: number, columnIndex: number) => {
  return {
    rowIndex: Math.floor(rowIndex / 3) * 3 + 1,
    columnIndex: Math.floor(columnIndex / 3) * 3 + 1,
  };
};

const adjacentOffsets = [
  { rowIndex: -1, columnIndex: -1 },
  { rowIndex: -1, columnIndex: 0 },
  { rowIndex: -1, columnIndex: 1 },
  { rowIndex: 0, columnIndex: -1 },
  { rowIndex: 0, columnIndex: 0 },
  { rowIndex: 0, columnIndex: 1 },
  { rowIndex: 1, columnIndex: -1 },
  { rowIndex: 1, columnIndex: 0 },
  { rowIndex: 1, columnIndex: 1 },
];
export const calcAlternatives = (
  board: Board | null,
  rowIndex: number,
  columnIndex: number
) => {
  if (!board) {
    return [];
  }
  const alternatives = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const row = board[rowIndex];
  const column = board.map((row) => row[columnIndex]);
  const squareCenter = findSquareCenter(rowIndex, columnIndex);
  const squareIndicies = adjacentOffsets.map((offset) => ({
    rowIndex: squareCenter.rowIndex + offset.rowIndex,
    columnIndex: squareCenter.columnIndex + offset.columnIndex,
  }));
  const square = squareIndicies.map(
    ({ rowIndex, columnIndex }) => board[rowIndex][columnIndex]
  );

  return alternatives.filter(
    (alternative) =>
      !row.includes(alternative) &&
      !column.includes(alternative) &&
      !square.includes(alternative)
  );
};
