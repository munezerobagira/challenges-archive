import { useMemo } from "react";
import "./board.css";
import Cell from "./Cell";
function Board({ board, active, mushrooms, handleKeyUp }) {
  if (board[0] && mushrooms) {
    return (
      <table>
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
                      : mushrooms.includes(rowIndex + " " + cellIndex)
                      ? "mushroom"
                      : ""
                  }
                ></Cell>
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
