import {
  tileAdjacentCities,
  tileResource,
  cityAdjacentRoads
} from "./constants";

export const isNullOrWhitespace = input => {
  if (typeof input === "undefined" || input == null) return true;

  return input.replace(/\s/g, "").length < 1;
};

export const randomizeArray = array => {
  let randomArray = array;
  let currentIndex = randomArray.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = randomArray[currentIndex];
    randomArray[currentIndex] = randomArray[randomIndex];
    randomArray[randomIndex] = temporaryValue;
  }

  return randomArray;
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

export const updatePlayerResources = (
  players,
  diceRoll,
  tiles,
  chits,
  upgradedCities
) => {
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

    playerProducingTileIndexes.forEach(index => {
      if (upgradedCities.includes(index)) {
        playerAffectingTiles.push(tiles[index]);
      }
    });

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
  chits,
  upgradedCities
) => {
  const newDiceRoll = getDiceRoll();
  const newSetup = currentPlayerIndex !== players.length - 1 ? setup : false;
  return {
    players:
      newSetup === false
        ? updatePlayerResources(
            players,
            newDiceRoll,
            tiles,
            chits,
            upgradedCities
          )
        : players,
    currentPlayerIndex: (currentPlayerIndex + 1) % players.length,
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

    newCities[cityIndex] = newPlayers[currentPlayerIndex].colour;
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
    cities[cityIndex] === players[currentPlayerIndex].colour
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
    newRoads[roadIndex] = newPlayers[currentPlayerIndex].colour;
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
  const currentPlayerRoads = getAllIndexes(roads, currentPlayer.colour);

  const playerRoadsAdjacentCities = [];

  currentPlayerRoads.forEach(road => {
    cityAdjacentRoads.forEach((roads, cityIndex) => {
      if (roads.includes(road)) {
        playerRoadsAdjacentCities.push(cityIndex);
      }
    });
  });

  const currentPlayerCrossroads = getAllIndexes(cities, currentPlayer.colour);
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

export const getAvailableCities = (roads, currentPlayer) => {
  const currentPlayerRoads = getAllIndexes(roads, currentPlayer.colour);

  let playerRoadsAdjacentCities = [];

  currentPlayerRoads.forEach(road => {
    cityAdjacentRoads.forEach((roads, cityIndex) => {
      if (roads.includes(road)) {
        playerRoadsAdjacentCities.push(cityIndex);
      }
    });
  });

  const availableCitiesAdjacentRoadsWrapped = cityAdjacentRoads.filter(
    (roads, cityIndex) => playerRoadsAdjacentCities.includes(cityIndex)
  );
  const availableCitiesAdjacentRoads = [];

  availableCitiesAdjacentRoadsWrapped.forEach(element => {
    availableCitiesAdjacentRoads.push(...element);
  });

  return playerRoadsAdjacentCities;
};

export const handleAppendNames = (players, names) => {
  let newPlayers = players.map((player, index) => {
    player.name = names[index];
    return player;
  });
  return newPlayers.filter(player => !isNullOrWhitespace(player.name));
};
