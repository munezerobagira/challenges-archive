import { useCallback, useEffect, useState, useReducer } from "react";
import Board from "./component/Board";
import "./App.css";
import boardReducer, {
  setBoard,
  gameInitialState,
  incrementX,
  decrementX,
  incrementY,
  decrementY,
  setUnVisted,
} from "./reducer/gameReducer";
function generateBoard({ height, width }) {
  return new Promise((resolve, reject) => {
    const board = [];
    const unVisited = [];

    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        if (Math.random() > 0.5) {
          row.push(1);
          unVisited.push(y + " " + x);
        } else {
          row.push("");
        }
      }
      board.push(row);
    }
    resolve({ board, unVisited });
  });
}
function App() {
  const [gameState, dispatch] = useReducer(boardReducer, gameInitialState);
  const handleKeyUp = useCallback((event) => {
    event.preventDefault();
    if (event.key === "ArrowLeft") {
      dispatch(decrementX());
    }
    if (event.key === "ArrowRight") {
      dispatch(incrementX());
    }
    if (event.key === "ArrowUp") {
      dispatch(decrementY());
    }
    if (event.key === "ArrowDown") {
      dispatch(incrementY());
    }
  }, []);
  useEffect(() => {
    window.removeEventListener("keyup", handleKeyUp);
    window.addEventListener("keyup", handleKeyUp);
    const boardGenerator = async () => {
      const { board, unVisited } = await generateBoard({
        height: 10,
        width: 10,
      });
      dispatch(setUnVisted(unVisited));
      dispatch(setBoard(board));
    };
    boardGenerator();
  }, []);

  if (!gameState.board || !gameState.unVisted) return <div>Loading...</div>;
  console.log(gameState.unVisted);
  return (
    <>
      <Board
        board={gameState.board}
        active={{ x: gameState.x, y: gameState.y }}
        unVisited={gameState.unVisted}
        handleKeyUp={handleKeyUp}
      />
    </>
  );
}

export default App;
