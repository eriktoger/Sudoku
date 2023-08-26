import { Dispatch } from "react";
import { Coordinate } from "./types";

export const Cell = ({
  content,
  isEditable,
  alternatives,
  borderStyle,
  isSelected,
  setCurrentCell,
  setAlternatives,
}: {
  content: string;
  isEditable: boolean;
  alternatives: number[];
  borderStyle: {
    [key: string]: string;
  };
  isSelected: boolean;
  setCurrentCell: () => void;
  setAlternatives: Dispatch<React.SetStateAction<number[]>>;
}) => {
  const display = content === "0" ? "" : content;

  return (
    <div
      onClick={() => {
        if (isEditable) {
          setCurrentCell();
          setAlternatives(alternatives);
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
