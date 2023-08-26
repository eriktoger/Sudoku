export const Cell = ({
  content,
  isEditable,
  suggestions,
  borderStyle,
}: {
  content: string;
  isEditable: boolean;
  suggestions: number[];
  borderStyle: {
    [key: string]: string;
  };
}) => {
  const display = content === "0" ? "" : content;

  return (
    <div
      onClick={() => {
        console.log(isEditable, suggestions);
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: isEditable ? "normal" : "bold",
        height: 40,
        width: 40,
        boxSizing: "border-box",
        ...borderStyle,
      }}
    >
      {display}
    </div>
  );
};
