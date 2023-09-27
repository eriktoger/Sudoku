import { useAppStore } from "../store";

const ChooseButton = ({ gameMode }: { gameMode: string }) => {
  const setBoard = useAppStore((state) => state.setBoard);
  const setVisualBoard = useAppStore((state) => state.setVisualBoard);
  const setGameOver = useAppStore((state) => state.setGameOver);
  const isChooseButtonLoading = useAppStore(
    (state) => state.isChooseButtonLoading
  );
  const setIsChooseButtonLoading = useAppStore(
    (state) => state.setIsChooseButtonLoading
  );

  const getBoard = async () => {
    const url = import.meta.env.VITE_BACKEND_URL;
    setIsChooseButtonLoading(true);
    const seed =
      gameMode === "Test" ? 2 : Math.floor(Math.random() * Math.pow(2, 16));

    try {
      const res = await fetch(`${url}/${gameMode.toLowerCase()}/${seed}`, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await res.json();

      setVisualBoard(data.board);
      setBoard(data.board);
      setGameOver(false);
    } catch (error) {
      console.warn({ error });
    } finally {
      setIsChooseButtonLoading(false);
    }
  };

  return (
    <button disabled={isChooseButtonLoading} onClick={getBoard}>
      {gameMode}
    </button>
  );
};

const GameModes = ["Test", "Easy", "Medium", "Hard"] as const;

export const ChooseDifficulty = () => {
  const gameOverMessage = useAppStore((state) => state.gameOverMessage);
  return (
    <div>
      <span>{gameOverMessage}</span>
      <div style={{ display: "flex", gap: 10 }}>
        {GameModes.map((gameMode) => (
          <ChooseButton key={gameMode} gameMode={gameMode} />
        ))}
      </div>
    </div>
  );
};
