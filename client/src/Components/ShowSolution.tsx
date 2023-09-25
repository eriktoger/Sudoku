import { useAppStore } from "../store";

export const ShowSolution = () => {
  const setGameOver = useAppStore((state) => state.setGameOver);
  const setVisualBoard = useAppStore((state) => state.setVisualBoard);
  const setGameOverMessage = useAppStore((state) => state.setGameOverMessage);
  const maskedBoard = useAppStore((state) => state.maskedBoard);
  return (
    <div style={{ width: 360, display: "flex", justifyContent: "center" }}>
      <button
        onClick={async () => {
          const url = import.meta.env.VITE_BACKEND_URL;
          const response = await fetch(`${url}/solve`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ newboard: maskedBoard }),
          });
          const data = await response.json();
          setVisualBoard(data.board);
          setGameOver(true);
          setGameOverMessage("Winners never quit, and quitters never win.");
        }}
      >
        I give up!
      </button>
    </div>
  );
};
