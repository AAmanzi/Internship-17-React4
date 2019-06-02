import * as gameUtils from "../../utils";
import * as gameConstants from "../../constants";

// action types
const ADD_CITY = "ADD_CITY";
const UPGRADE_CITY = "UPGRADE_CITY";
const ADD_ROAD = "ADD_ROAD";

const EDIT_PLAYERS = "EDIT_PLAYERS";
const SET_ACTION = "SET_ACTION";

// initial state
const initialState = {
  tiles: gameUtils.getRandomTiles(),
  chits: gameUtils.getRandomChits(),
  cities: gameConstants.startCities,
  upgradedCities: [],
  roads: gameConstants.startRoads
};

// action creators
export const addCity = (
  cities,
  cityIndex,
  currentPlayerIndex,
  players,
  setup,
  action,
  upgradedCities,
  availableCities
) => dispatch => {
  if (action !== "buildSettlement" && action !== "buildCity") {
    return;
  }
  if (setup === true && players[currentPlayerIndex].settlements === 3) {
    return;
  }
  if (
    (setup === false &&
      availableCities.includes(cityIndex) === false &&
      cities[cityIndex] !== players[currentPlayerIndex].name) ||
    upgradedCities.includes(cityIndex) === true
  ) {
    return;
  }
  const toDispatch = gameUtils.handleAddCity(
    cities,
    cityIndex,
    currentPlayerIndex,
    players,
    setup,
    action,
    upgradedCities
  );

  dispatch({
    type: EDIT_PLAYERS,
    payload: toDispatch.players
  });

  dispatch({
    type: SET_ACTION,
    payload: toDispatch.action
  });

  dispatch({
    type: UPGRADE_CITY,
    payload: toDispatch.upgradedCities
  });

  return dispatch({
    type: ADD_CITY,
    payload: toDispatch.cities
  });
};

export const addRoad = (
  roads,
  roadIndex,
  currentPlayerIndex,
  players,
  setup,
  action,
  availableRoads
) => dispatch => {
  if (action !== "buildRoad") {
    return;
  }
  if (setup === true && players[currentPlayerIndex].roads === 13) {
    return;
  }
  if (availableRoads.includes(roadIndex) === false) {
    return;
  }

  const toDispatch = gameUtils.handleAddRoad(
    roads,
    roadIndex,
    currentPlayerIndex,
    players,
    setup,
    action
  );

  dispatch({
    type: EDIT_PLAYERS,
    payload: toDispatch.players
  });

  dispatch({
    type: SET_ACTION,
    payload: toDispatch.action
  });

  return dispatch({
    type: ADD_ROAD,
    payload: toDispatch.roads
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITY:
      return {
        ...state,
        cities: action.payload
      };
    case UPGRADE_CITY:
      return {
        ...state,
        upgradedCities: action.payload
      };
    case ADD_ROAD:
      return {
        ...state,
        roads: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
