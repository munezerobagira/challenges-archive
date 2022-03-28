export default function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateUniqueBoardElement(
  width,
  height,
  exclude,
  length,
  initial = []
) {
  if (initial.length === length) {
    return initial;
  }
  let x = randomNumber(0, width - 1);
  let y = randomNumber(0, height - 1);
  if (initial.includes(y + " " + x) || exclude.includes(y + " " + x)) {
    return generateUniqueBoardElement(width, height, exclude, length, initial);
  }
  initial.push(y + " " + x);
  return generateUniqueBoardElement(width, height, exclude, length, initial);
}
