import { useCallback, useEffect, useState } from "react";
import Board from "./component/Board";
import "./App.css";
function generateBoard({ height, width }) {
  const board = [];
  for (let x = 1; x <= height; x++) {
    const row = [];
    for (let y = 1; y <= width; y++) {
      row.push(`${x},${y}`);
    }
    board.push(row);
  }
  return board;
}
function App() {
  const [board, setBoard] = useState(null);
  const [xActive, setXActive] = useState(0);
  const [yActive, setYActive] = useState(0);
  const handleKeyUp = useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        setYActive((previous) => previous - 1);
      }
      if (event.key === "ArrowRight") {
        setYActive((previous) => previous + 1);
      }
      if (event.key === "ArrowUp") {
        setXActive((previous) => previous - 1);
      }
      if (event.key === "ArrowDown") {
        setXActive((previous) => previous + 1);
      }
    },
    [active, setActive]
  );
  useEffect(() => {}, [active]);
  useEffect(() => {
    window.removeEventListener("keyup", handleKeyUp);
    window.addEventListener("keyup", handleKeyUp);
    const board = generateBoard({ height: 10, width: 10 });
    setBoard(board);
  }, []);

  if (!board) return <div>Loading...</div>;
  return (
    <>
      <Board board={board} active={active} handleKeyUp={handleKeyUp} />
    </>
  );
}

export default App;
