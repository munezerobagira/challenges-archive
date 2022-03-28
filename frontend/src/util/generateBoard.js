import randomNumber, { generateUniqueBoardElement } from "./randomNumber";

function generateBoard(width, height) {
  return new Promise(async (resolve, reject) => {
    const board = [];
    const unVisited = [];
    width = parseInt(width);
    height = parseInt(height);
    const [startY, startX] = [
      randomNumber(Math.floor((height - 1) / 3), Math.floor((height - 1) / 2)),
      randomNumber(Math.floor((width - 1) / 2), Math.floor((width - 1) / 3)),
    ];

    const uniqueElement = generateUniqueBoardElement(
      width,
      height,
      [startY + " " + startX],
      width
    );
    console.log(uniqueElement);
    for (let y = 0; y < height; y++) {
      let row = [];
      for (let x = 0; x < width; x++) {
        if (uniqueElement.includes(y + " " + x)) {
          row.push(1);
          unVisited.push(y + " " + x);
        } else {
          row.push("");
        }
      }
      board.push(row);
    }
    resolve({ board, unVisited, startY, startX });
  });
}

export default generateBoard;
