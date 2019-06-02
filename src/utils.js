import {
  tiles,
  chits,
  tileAdjacentCities,
  tileResource,
  cityAdjacentRoads
} from "./constants";

export const getRandomTiles = () => {
  let randomTiles = tiles;
  let currentIndex = randomTiles.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = randomTiles[currentIndex];
    randomTiles[currentIndex] = randomTiles[randomIndex];
    randomTiles[randomIndex] = temporaryValue;
  }

  return randomTiles;
};

export const getRandomChits = () => {
  let randomChits = chits;
  let currentIndex = randomChits.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = randomChits[currentIndex];
    randomChits[currentIndex] = randomChits[randomIndex];
    randomChits[randomIndex] = temporaryValue;
  }

  return randomChits;
};

export const getAllIndexes = (arr, val) => {
  var indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) !== -1) {
    indexes.push(i);
  }
  return indexes;
};

export const getResourceFromTile = tile => {
  return tileResource[tile];
};

export const getDiceRoll = () => {
  return Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1);
};

export const updatePlayerResources = (players, diceRoll, tiles, chits) => {
  const producingTileIndexes = getAllIndexes(chits, diceRoll);

  const newPlayers = players.map(player => {
    const playerAffectingTileIndexes = producingTileIndexes.filter(index =>
      player.tilesAffectedBy.includes(index)
    );

    const playerProducingTileIndexes = player.tilesAffectedBy.filter(index =>
      playerAffectingTileIndexes.includes(index)
    );

    const playerAffectingTiles = playerProducingTileIndexes.map(
      index => tiles[index]
    );

    let newResources = { ...player.resources };

    playerAffectingTiles.forEach(tile => {
      const resource = getResourceFromTile(tile);
      if (resource !== "") {
        newResources[resource]++;
      }
    });

    return {
      ...player,
      resources: { ...newResources }
    };
  });

  return newPlayers;
};

export const handleNextPlayer = (
  players,
  currentPlayerIndex,
  setup,
  tiles,
  chits
) => {
  const newDiceRoll = getDiceRoll();
  const newSetup = currentPlayerIndex !== 3 ? setup : false;
  return {
    players:
      newSetup === false
        ? updatePlayerResources(players, newDiceRoll, tiles, chits)
        : players,
    currentPlayerIndex: (currentPlayerIndex + 1) % 4,
    setup: newSetup,
    diceRoll: newDiceRoll
  };
};

export const handleAddCity = (
  cities,
  cityIndex,
  currentPlayerIndex,
  players,
  setup,
  action,
  upgradedCities
) => {
  let newCities = [...cities];
  let newPlayers = [...players];
  let newAction = action;
  let newUpgradedCities = upgradedCities;
  if (action === "buildSettlement" && cities[cityIndex] === "") {
    let elementsToAppend = tileAdjacentCities.filter(element =>
      element.cities.includes(cityIndex)
    );
    elementsToAppend = elementsToAppend.map(element => element.tile);

    newPlayers[currentPlayerIndex].tilesAffectedBy = [
      ...newPlayers[currentPlayerIndex].tilesAffectedBy,
      ...elementsToAppend
    ];

    newCities[cityIndex] = newPlayers[currentPlayerIndex].name;
    newPlayers[currentPlayerIndex].settlements--;
    if (setup === false) {
      newPlayers[currentPlayerIndex].resources.Brick--;
      newPlayers[currentPlayerIndex].resources.Grain--;
      newPlayers[currentPlayerIndex].resources.Wool--;
      newPlayers[currentPlayerIndex].resources.Lumber--;
      newAction = "";
    }
    newPlayers[currentPlayerIndex].gamePoints++;
    if (newPlayers[currentPlayerIndex].settlements === 3 && setup === true) {
      newAction = "buildRoad";
    }
  }
  if (
    action === "buildCity" &&
    cities[cityIndex] === players[currentPlayerIndex].name
  ) {
    newPlayers[currentPlayerIndex].cities--;
    newPlayers[currentPlayerIndex].resources.Grain -= 2;
    newPlayers[currentPlayerIndex].resources.Ore -= 3;
    newPlayers[currentPlayerIndex].gamePoints++;
    newUpgradedCities.push(cityIndex);
    newAction = "";
  }
  return {
    cities: newCities,
    players: newPlayers,
    action: newAction,
    upgradedCities: newUpgradedCities
  };
};

export const handleAddRoad = (
  roads,
  roadIndex,
  currentPlayerIndex,
  players,
  setup,
  action
) => {
  let newRoads = [...roads];
  let newPlayers = [...players];
  let newAction = action;
  if (newRoads[roadIndex] === "") {
    newRoads[roadIndex] = newPlayers[currentPlayerIndex].name;
    newPlayers[currentPlayerIndex].roads--;
    if (setup === false) {
      newPlayers[currentPlayerIndex].resources.Lumber--;
      newPlayers[currentPlayerIndex].resources.Brick--;
      newAction = "";
    }
  }
  return {
    roads: newRoads,
    players: newPlayers,
    action: newAction
  };
};

export const handleSetAction = (action, setup, currentPlayerIndex, players) => {
  if (setup === true) {
    return action;
  }
  if (
    (action === "buildSettlement" &&
      (players[currentPlayerIndex].resources.Brick < 1 ||
        players[currentPlayerIndex].resources.Wool < 1 ||
        players[currentPlayerIndex].resources.Grain < 1 ||
        players[currentPlayerIndex].resources.Lumber < 1)) ||
    players[currentPlayerIndex].settlements === 0 ||
    (action === "buildRoad" &&
      (players[currentPlayerIndex].resources.Brick < 1 ||
        players[currentPlayerIndex].resources.Lumber < 1)) ||
    players[currentPlayerIndex].roads === 0 ||
    (action === "buildCity" &&
      (players[currentPlayerIndex].resources.Ore < 3 ||
        players[currentPlayerIndex].resources.Grain < 2 ||
        players[currentPlayerIndex].cities === 0))
  ) {
    return "insufficientResources";
  }

  return action;
};

export const getWinner = players => {
  return players.find(player => player.gamePoints >= 10);
};

export const getAvailableRoads = (roads, cities, currentPlayer) => {
  const currentPlayerRoads = getAllIndexes(roads, currentPlayer.name);

  const playerRoadsAdjacentCities = [];

  currentPlayerRoads.forEach(road => {
    cityAdjacentRoads.forEach((roads, cityIndex) => {
      if (roads.includes(road)) {
        playerRoadsAdjacentCities.push(cityIndex);
      }
    });
  });

  const currentPlayerCrossroads = getAllIndexes(cities, currentPlayer.name);

  playerRoadsAdjacentCities.forEach(road => {
    currentPlayerCrossroads.push(road);
  });

  const currentPlayerAvailableRoadsWrapped = cityAdjacentRoads.filter(
    (roads, cityIndex) => currentPlayerCrossroads.includes(cityIndex)
  );
  const currentPlayerAvailableRoads = [];

  currentPlayerAvailableRoadsWrapped.forEach(element => {
    currentPlayerAvailableRoads.push(...element);
  });

  return currentPlayerAvailableRoads;
};
