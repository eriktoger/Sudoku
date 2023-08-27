import { useAppStore } from "../store";

export const ShowSolution = () => {
  const setGameOver = useAppStore((state) => state.setGameOver);
  const setVisualBoard = useAppStore((state) => state.setVisualBoard);
  const board = useAppStore((state) => state.board);
  const setGameOverMessage = useAppStore((state) => state.setGameOverMessage);
  return (
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
  );
};
