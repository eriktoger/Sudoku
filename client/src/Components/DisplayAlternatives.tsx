import { useAppStore } from "../store";
import { ResetButton } from "./ResetButton";

export const DisplayAlternatives = () => {
  const currentAlternatives = useAppStore((state) => state.currentAlternatives);
  const visualBoard = useAppStore((state) => state.visualBoard);
  const currentCell = useAppStore((state) => state.currentCell);
  const applyAlternativeToVisualBoard = useAppStore(
    (state) => state.applyAlternativeToVisualBoard
  );
  const setCurrentAlternatives = useAppStore(
    (state) => state.setCurrentAlternatives
  );
  const setCurrentCell = useAppStore((state) => state.setCurrentCell);

  const displayResetButton =
    currentCell &&
    visualBoard?.[currentCell.rowIndex][currentCell.columnIndex] !== 0;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        margin: 10,
        height: 60,
      }}
    >
      <div style={{ display: "flex", gap: 10 }}>
        {currentAlternatives.map((alternative, index) => (
          <button
            style={{ height: 30, width: 30 }}
            key={index}
            onClick={() => {
              applyAlternativeToVisualBoard(alternative);
              setCurrentCell(null);
              setCurrentAlternatives([]);
            }}
          >
            {alternative}
          </button>
        ))}
      </div>
      {displayResetButton && <ResetButton />}
    </div>
  );
};
