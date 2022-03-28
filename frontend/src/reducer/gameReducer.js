export const gameInitialState = {
  board: [],
  x: 0,
  y: 0,
  count: 0,
  mushrooms: [],
  gameOn: false,
};

//  Constanst
export const SET_BOARD = "SET_BOARD";
export const SET_X = "SET_X";
export const SET_Y = "SET_Y";
export const INCREMENT_X = "INCREMENT_X";
export const DECREMENT_X = "DECREMENT_X";
export const INCREMENT_Y = "INCREMENT_Y";
export const DECREMENT_Y = "DECREMENT_Y";
export const SET_MUSHROOMS = "SET_MUSHROOMS";
export const RESET = "RESET";

// reducers

function gameReducer(state = gameInitialState, action) {
  let nextValue,
    updatedMushrooms,
    gameOn = state.gameOn,
    count = state.count;

  switch (action.type) {
    case SET_BOARD:
      return {
        ...state,
        board: action.payload,
      };
    case SET_X:
      return {
        ...state,
        x: action.payload,
      };
    case SET_Y:
      return {
        ...state,
        y: action.payload,
      };
    case INCREMENT_X:
      nextValue =
        state.board[0].length > state.x + 1 ? (count++, state.x + 1) : state.x;
      updatedMushrooms = state.mushrooms.filter(
        (item) => item !== state.y + " " + nextValue
      );
      gameOn = updatedMushrooms.length !== 0;
      return {
        ...state,
        mushrooms: updatedMushrooms,
        gameOn: gameOn,
        x: nextValue,
      };
    case DECREMENT_X:
      nextValue = state.x > 0 ? (count++, state.x - 1) : state.x;
      updatedMushrooms = state.mushrooms.filter(
        (item) => item !== state.y + " " + nextValue
      );
      gameOn = updatedMushrooms.length !== 0;

      return {
        ...state,
        mushrooms: updatedMushrooms,
        count,
        gameOn,
        x: nextValue,
      };
    case INCREMENT_Y:
      nextValue =
        state.y + 1 < state.board.length ? (count++, state.y + 1) : state.y;
      updatedMushrooms = state.mushrooms.filter(
        (item) => item !== nextValue + " " + state.x
      );
      gameOn = updatedMushrooms.length !== 0;
      return {
        ...state,
        mushrooms: updatedMushrooms,
        gameOn,
        y: nextValue,
      };
    case DECREMENT_Y:
      nextValue = state.y > 0 ? (count++, state.y - 1) : state.y;
      updatedMushrooms = state.mushrooms.filter(
        (item) => item !== nextValue + " " + state.x
      );
      gameOn = updatedMushrooms.length !== 0;
      return {
        ...state,
        mushrooms: updatedMushrooms,
        count,
        gameOn,
        y: nextValue,
      };
    case SET_MUSHROOMS:
      return {
        ...state,
        mushrooms: action.payload,
      };
    case RESET:
      return gameInitialState;
    default:
      return state;
  }
}

// actions

export function setBoard(board) {
  return {
    type: SET_BOARD,
    payload: board,
  };
}
export function setX(x) {
  return {
    type: SET_X,
    payload: x,
  };
}
export function setY(y) {
  return {
    type: SET_Y,
    payload: y,
  };
}
export function incrementX() {
  return {
    type: INCREMENT_X,
  };
}
export function decrementX() {
  return {
    type: DECREMENT_X,
  };
}
export function incrementY() {
  return {
    type: INCREMENT_Y,
  };
}
export function decrementY() {
  return {
    type: DECREMENT_Y,
  };
}

export function setMushrooms(mushrooms) {
  return {
    type: SET_MUSHROOMS,
    payload: mushrooms,
  };
}
export function reset() {
  return {
    type: RESET,
  };
}
export default gameReducer;
