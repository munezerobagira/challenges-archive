import { useMemo } from "react";
import "./board.css";
import Cell from "./Cell";
function Board({ board, active, unVisited, handleKeyUp }) {
  console.log(board, unVisited);
  if (board[0] && unVisited) {
    return (
      <table
        onKeyUp={(event) => {
          console.log(event.key);
          handleKeyUp(event);
        }}
      >
        <thead></thead>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr className="row" key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <Cell
                  key={cellIndex}
                  className={
                    active.y === rowIndex && active.x === cellIndex
                      ? "active"
                      : ""
                  }
                >
                  {unVisited.includes(rowIndex + " " + cellIndex) ? cell : ""}
                </Cell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return <div>Choose the board size</div>;
  }
}

export default Board;
