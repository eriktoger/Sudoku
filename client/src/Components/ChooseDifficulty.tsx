import { useState } from "react";
import { useAppStore } from "../store";

export const ChooseDifficulty = () => {
  const setBoard = useAppStore((state) => state.setBoard);
  const setMaskedBoard = useAppStore((state) => state.setMaskedBoard);
  const setVisualBoard = useAppStore((state) => state.setVisualBoard);
  const setGameOver = useAppStore((state) => state.setGameOver);
  const gameOverMessage = useAppStore((state) => state.gameOverMessage);
  const [isLoading, setIsLoading] = useState(false);

  const getBoard = async (hiddenCells: number) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    setIsLoading(true);
    try {
      const res = await fetch(url, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await res.json();

      const maskingIndicies = [...Array(81).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, hiddenCells);
      const newBoard = JSON.parse(JSON.stringify(data));
      for (const maskingIndex of maskingIndicies) {
        const row = Math.floor(maskingIndex / 9);
        const col = maskingIndex - row * 9;
        newBoard[row][col] = 0;
      }
      setMaskedBoard(JSON.parse(JSON.stringify(newBoard)));
      setVisualBoard(JSON.parse(JSON.stringify(newBoard)));
      setBoard(data);
      setGameOver(false);
    } catch (error) {
      console.warn({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <span>{gameOverMessage}</span>
      <div style={{ display: "flex", gap: 10 }}>
        <button disabled={isLoading} onClick={() => getBoard(1)}>
          Test
        </button>
        <button disabled={isLoading} onClick={() => getBoard(30)}>
          Easy
        </button>
        <button disabled={isLoading} onClick={() => getBoard(45)}>
          Medium
        </button>
        <button disabled={isLoading} onClick={() => getBoard(60)}>
          Hard
        </button>
      </div>
    </div>
  );
};
