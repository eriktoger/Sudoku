import { calcBorderStyle } from "../helpers";
import { useAppStore } from "../store";
import { Coordinate } from "../types";

export const Cell = ({
  coordinate,
  content,
  alternatives,
}: {
  coordinate: Coordinate;
  content: string;
  alternatives: number[];
}) => {
  const setCurrentAlternatives = useAppStore(
    (state) => state.setCurrentAlternatives
  );
  const setCurrentCell = useAppStore((state) => state.setCurrentCell);
  const currentCell = useAppStore((state) => state.currentCell);
  const maskedBoard = useAppStore((state) => state.maskedBoard);

  const display = content === "0" ? "" : content;
  const { rowIndex, columnIndex } = coordinate;
  const isEditable = maskedBoard?.[rowIndex][columnIndex] === 0;

  const isSelected =
    currentCell?.rowIndex === rowIndex &&
    currentCell?.columnIndex === columnIndex;
  const borderStyle = calcBorderStyle(rowIndex, columnIndex);
  return (
    <div
      onClick={() => {
        if (isEditable) {
          setCurrentCell(coordinate);
          setCurrentAlternatives(alternatives);
        }
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: isEditable ? 14 : 16,
        fontWeight: isEditable ? "lighter" : "bolder",
        backgroundColor: isSelected ? "lightgreen" : "white",
        height: 40,
        width: 40,
        boxSizing: "border-box",
        ...borderStyle,
      }}
    >
      {display}
    </div>
  );
};
