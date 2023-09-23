import { useAppStore } from "../store";

export const ShowSolution = () => {
  const setGameOver = useAppStore((state) => state.setGameOver);
  const setVisualBoard = useAppStore((state) => state.setVisualBoard);
  const maskedBoard = useAppStore((state) => state.maskedBoard);
  const board = useAppStore((state) => state.board);
  const setGameOverMessage = useAppStore((state) => state.setGameOverMessage);
  return (
    <div style={{ width: 360, display: "flex", justifyContent: "center" }}>
      <button
        onClick={async () => {
          const what = await fetch("http://localhost:8000/solve", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ newboard: maskedBoard }),
          });
          const data = await what.json();
          console.log({ data });
          return;
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
