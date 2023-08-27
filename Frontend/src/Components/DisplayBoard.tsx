import { calcAlternatives } from "../helpers";
import { useAppStore } from "../store";
import { Cell } from "./Cell";

export const DisplayBoard = () => {
  const visualBoard = useAppStore((state) => state.visualBoard);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 40px)" }}>
      {visualBoard?.map((row, rowIndex) => {
        return row.map((item, columnIndex) => {
          const alternatives = calcAlternatives(
            visualBoard,
            rowIndex,
            columnIndex
          );
          const coordinate = { rowIndex, columnIndex };
          return (
            <Cell
              key={`${rowIndex}-${columnIndex}`}
              coordinate={coordinate}
              content={item.toString()}
              alternatives={alternatives}
            />
          );
        });
      })}
    </div>
  );
};
