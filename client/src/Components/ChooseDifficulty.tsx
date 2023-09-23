import { useAppStore } from "../store";

const ChooseButton = ({
  text,
  hiddenCells,
}: {
  text: string;
  hiddenCells: number;
}) => {
  const setBoard = useAppStore((state) => state.setBoard);
  const setMaskedBoard = useAppStore((state) => state.setMaskedBoard);
  const setVisualBoard = useAppStore((state) => state.setVisualBoard);
  const setGameOver = useAppStore((state) => state.setGameOver);
  const isChooseButtonLoading = useAppStore(
    (state) => state.isChooseButtonLoading
  );
  const setIsChooseButtonLoading = useAppStore(
    (state) => state.setIsChooseButtonLoading
  );

  const getBoard = async (hiddenCells: number) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    console.log({ url });
    setIsChooseButtonLoading(true);
    const seed = Math.floor(Math.random() * Math.pow(2, 16));

    try {
      const res = await fetch(`${url}/${seed}`, {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await res.json();
      const maskingIndicies = [...Array(81).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, hiddenCells);
      const newBoard = JSON.parse(JSON.stringify(data.board));
      for (const maskingIndex of maskingIndicies) {
        const row = Math.floor(maskingIndex / 9);
        const col = maskingIndex % 9;
        newBoard[row][col] = 0;
      }
      setMaskedBoard(JSON.parse(JSON.stringify(newBoard)));
      setVisualBoard(JSON.parse(JSON.stringify(newBoard)));
      setBoard(data.board);
      setGameOver(false);
    } catch (error) {
      console.warn({ error });
    } finally {
      setIsChooseButtonLoading(false);
    }
  };

  return (
    <button
      disabled={isChooseButtonLoading}
      onClick={() => getBoard(hiddenCells)}
    >
      {text}
    </button>
  );
};

const GameModes = [
  { text: "Test", hiddenCells: 1 },
  { text: "Easy", hiddenCells: 30 },
  { text: "Medium", hiddenCells: 45 },
  { text: "Hard", hiddenCells: 64 },
] as const;

export const ChooseDifficulty = () => {
  const gameOverMessage = useAppStore((state) => state.gameOverMessage);
  return (
    <div>
      <span>{gameOverMessage}</span>
      <div style={{ display: "flex", gap: 10 }}>
        {GameModes.map(({ text, hiddenCells }) => (
          <ChooseButton key={text} text={text} hiddenCells={hiddenCells} />
        ))}
      </div>
    </div>
  );
};
