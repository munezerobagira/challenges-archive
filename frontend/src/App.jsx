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
  setMushrooms,
  reset,
  setX,
  setY,
} from "./reducer/gameReducer";
import generateBoard from "./util/generateBoard";

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
  const boardGenerator = async () => {
    dispatch(reset());
    let height = window.prompt("Enter the height of the board");
    let width = window.prompt("Enter the width of the board");
    height = parseInt(height);
    width = parseInt(width);
    if (height && width) {
      const { board, unVisited, startX, startY } = await generateBoard(
        height,
        width
      );
      dispatch(setMushrooms(unVisited));
      dispatch(setBoard(board));
      dispatch(setX(startX));
      dispatch(setY(startY));
    }
  };
  useEffect(() => {
    window.removeEventListener("keyup", handleKeyUp);
    window.addEventListener("keyup", handleKeyUp);
  }, []);

  if (!gameState.board || !gameState.mushrooms.length)
    return (
      <div>
        {gameState.count > 0 ? (
          <div>
            {alert("Moves to catch queen " + gameState.count)}
            <button onClick={boardGenerator}>Play again</button>
          </div>
        ) : (
          <button onClick={boardGenerator}>play</button>
        )}
      </div>
    );
  return (
    <>
      <Board
        board={gameState.board}
        active={{ x: gameState.x, y: gameState.y }}
        mushrooms={gameState.mushrooms}
        handleKeyUp={handleKeyUp}
      />
    </>
  );
}

export default App;
