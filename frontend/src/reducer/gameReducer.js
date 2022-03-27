export const gameInitialState = {
  board: [],
  x: 0,
  y: 0,
  count: 0,
  unVisted: [],
  gameOn: false,
};
export const SET_BOARD = "SET_BOARD";
export const SET_X = "SET_X";
export const SET_Y = "SET_Y";
export const INCREMENT_X = "INCREMENT_X";
export const DECREMENT_X = "DECREMENT_X";
export const INCREMENT_Y = "INCREMENT_Y";
export const DECREMENT_Y = "DECREMENT_Y";
export const SET_UNVISITED = "SET_UNVISITED";
function gameReducer(state = gameInitialState, action) {
  let nextValue;
  let nextUnivisted;
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
      nextValue = state.board[0].length > state.x + 1 ? state.x + 1 : state.x;
      nextUnivisted = state.unVisted.filter(
        (item) => item !== state.y + " " + nextValue
      );
      return {
        ...state,
        unVisted: nextUnivisted,
        x: nextValue,
      };
    case DECREMENT_X:
      nextValue = state.x > 0 ? state.x - 1 : state.x;
      nextUnivisted = state.unVisted.filter(
        (item) => item !== state.y + " " + nextValue
      );
      return {
        ...state,
        unVisted: nextUnivisted,
        x: nextValue,
      };
    case INCREMENT_Y:
      nextValue = state.y + 1 < state.board.length ? state.y + 1 : state.y;
      nextUnivisted = state.unVisted.filter(
        (item) => item !== nextValue + " " + state.x
      );
      return {
        ...state,
        unVisted: nextUnivisted,
        y: nextValue,
      };
    case DECREMENT_Y:
      nextValue = state.y > 0 ? state.y - 1 : state.y;
      nextUnivisted = state.unVisted.filter(
        (item) => item !== nextValue + " " + state.x
      );
      return {
        ...state,
        unVisted: nextUnivisted,
        y: nextValue,
      };
    case SET_UNVISITED:
      return {
        ...state,
        unVisted: action.payload,
      };
    default:
      return state;
  }
}

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

export function setUnVisted(unVisted) {
  return {
    type: SET_UNVISITED,
    payload: unVisted,
  };
}
export default gameReducer;
