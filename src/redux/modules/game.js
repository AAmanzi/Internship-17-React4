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
  players: gameConstants.players
};

// action creators
export const nextPlayer = (players, currentPlayerIndex, setup) => dispatch => {
  if (setup === true && players[currentPlayerIndex].settlements !== 3) {
    return;
  }
  return dispatch({
    type: NEXT_PLAYER,
    payload: gameUtils.handleNextPlayer(currentPlayerIndex, setup)
  });
};

export const setAction = action => dispatch => {
  return dispatch({
    type: SET_ACTION,
    payload: action
  });
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_PLAYER:
      return {
        ...state,
        currentPlayerIndex: action.payload.currentPlayerIndex,
        setup: action.payload.setup
      };
    case SET_ACTION:
      return {
        ...state,
        activeAction: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
