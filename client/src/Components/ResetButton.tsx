import { useAppStore } from "../store";

export const ResetButton = () => {
  const setCurrentAlternatives = useAppStore(
    (state) => state.setCurrentAlternatives
  );
  const setCurrentCell = useAppStore((state) => state.setCurrentCell);
  const resetCurrentCellOnVisualBoard = useAppStore(
    (state) => state.resetCurrentCellOnVisualBoard
  );
  return (
    <button
      onClick={() => {
        resetCurrentCellOnVisualBoard();
        setCurrentCell(null);
        setCurrentAlternatives([]);
      }}
    >
      Reset
    </button>
  );
};
