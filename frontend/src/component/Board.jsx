import { useMemo } from "react";
import "./board.css";
import Cell from "./Cell";
function Board({ board, previousActive, active, handleKeyUp }) {
  console.log(board);
  console.log(active);
  if (board[0][0]) {
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
                  key={cell}
                  className={
                    active.x === rowIndex && active.y === cellIndex
                      ? "active"
                      : ""
                  }
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Board;
