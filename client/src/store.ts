import { create } from "zustand";
import { Board, Coordinate } from "./types";

type State = {
  gameOver: boolean;
  setGameOver: (gameOver: boolean) => void;
  gameOverMessage: string;
  setGameOverMessage: (gameOver: string) => void;
  board: Board | null;
  setBoard: (board: Board | null) => void;
  visualBoard: Board | null;
  setVisualBoard: (visualBoard: Board | null) => void;
  applyAlternativeToVisualBoard: (alternative: number) => void;
  resetCurrentCellOnVisualBoard: () => void;
  currentCell: Coordinate | null;
  setCurrentCell: (currentCell: Coordinate | null) => void;
  currentAlternatives: number[];
  setCurrentAlternatives: (currentAlternatives: number[]) => void;
  isChooseButtonLoading: boolean;
  setIsChooseButtonLoading: (isChooseButtonLoading: boolean) => void;
};

export const useAppStore = create<State>((set) => ({
  gameOver: true,
  setGameOver: (gameOver: boolean) => set({ gameOver }),
  gameOverMessage: "Choose a diffculty to start the game",
  setGameOverMessage: (gameOverMessage: string) => set({ gameOverMessage }),
  board: null,
  setBoard: (board: Board | null) => set({ board }),
  visualBoard: null,
  setVisualBoard: (visualBoard: Board | null) => set({ visualBoard }),
  currentCell: null,
  setCurrentCell: (currentCell: Coordinate | null) => set({ currentCell }),
  currentAlternatives: [],
  setCurrentAlternatives: (currentAlternatives: number[]) =>
    set({ currentAlternatives }),
  isChooseButtonLoading: false,
  setIsChooseButtonLoading: (isChooseButtonLoading: boolean) =>
    set({ isChooseButtonLoading }),

  applyAlternativeToVisualBoard: (alternative: number) =>
    set((state) => {
      const { currentCell, visualBoard, gameOver } = state;
      if (!currentCell || !visualBoard) {
        return state;
      }
      visualBoard[currentCell.rowIndex][currentCell.columnIndex] = alternative;
      const boardDone = !visualBoard.flat().some((num) => num === 0);
      if (boardDone) {
        if (!gameOver) {
          return {
            visualBoard: [...visualBoard],
            gameOver: true,
            gameOverMessage: "Great you did it!",
          };
        }
      }
      return { visualBoard: [...visualBoard] };
    }),

  resetCurrentCellOnVisualBoard: () =>
    set((state) => {
      const { currentCell, visualBoard } = state;
      if (!currentCell || !visualBoard) {
        return state;
      }
      visualBoard[currentCell.rowIndex][currentCell.columnIndex] = 0;

      return { visualBoard: [...visualBoard] };
    }),
}));
