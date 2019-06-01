import * as gameUtils from "../../utils";
import * as gameConstants from "../../constants";

// action types
const NEXT_PLAYER = "NEXT_PLAYER";
const SET_ACTION = "SET_ACTION";

// initial state
const initialState = {
  activeAction: "buildSettlement",
  setup: true,
  currentPlayerIndex: 0,
  players: gameConstants.players,
  diceRoll: 0
};

// action creators
export const nextPlayer = (players, currentPlayerIndex, setup, tiles, chits) => dispatch => {
  if (
    setup === true &&
    (
      players[currentPlayerIndex].settlements !== 3 ||
      players[currentPlayerIndex].roads !== 13
    )
  ) {
    alert("You must build 2 settlements and 2 roads on your first turn!");
    return;
  }
  return dispatch({
    type: NEXT_PLAYER,
    payload: gameUtils.handleNextPlayer(players, currentPlayerIndex, setup, tiles, chits)
  });
};

export const setAction = (action, setup, currentPlayerIndex, players) => dispatch => {
  return dispatch({
    type: SET_ACTION,
    payload: gameUtils.handleSetAction(action, setup, currentPlayerIndex, players)
  });
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_PLAYER:
      return {
        ...state,
        activeAction: action.payload.setup === true ? "buildSettlement" : "",
        players: action.payload.players,
        currentPlayerIndex: action.payload.currentPlayerIndex,
        setup: action.payload.setup,
        diceRoll: action.payload.diceRoll
      };
    case SET_ACTION:
      return {
        ...state,
        activeAction: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
