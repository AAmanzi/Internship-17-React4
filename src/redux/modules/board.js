import * as gameUtils from "../../utils";
import * as gameConstants from "../../constants";

// action types
const ADD_CITY = "ADD_CITY";
const ADD_ROAD = "ADD_ROAD";

// initial state
const initialState = {
  tiles: gameUtils.getRandomTiles(),
  chits: gameUtils.getRandomChits(),
  cities: gameConstants.startCities,
  roads: gameConstants.startRoads
};

// action creators
export const addCity = (
  cities,
  cityIndex,
  currentPlayerIndex,
  players,
  setup
) => dispatch => {
  if(setup === true && players[currentPlayerIndex].settlements === 3){
    return;
  }
  return dispatch({
    type: ADD_CITY,
    payload: gameUtils.handleAddCity(
      cities,
      cityIndex,
      currentPlayerIndex,
      players
    )
  });
};

export const addRoad = (
  roads,
  roadIndex,
  currentPlayerIndex,
  players,
  setup
) => dispatch => {
  if(setup === true && players[currentPlayerIndex].roads === 12){
    return;
  }
  return dispatch({
    type: ADD_ROAD,
    payload: gameUtils.handleAddRoad(
      roads,
      roadIndex,
      currentPlayerIndex,
      players
    )
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY:
      return {
        ...state,
        cities: action.payload.cities,
        players: action.payload.players
      };
    case ADD_ROAD:
      return {
        ...state,
        roads: action.payload.roads,
        players: action.payload.players
      };
    default:
      return state;
  }
};

export default reducer;
