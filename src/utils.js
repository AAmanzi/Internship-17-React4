import { tiles, chits, tileAdjacentCities, tileResource } from "./constants";

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
    const playerAffectingTiles = tiles.filter((tile, index) =>
      playerAffectingTileIndexes.includes(index)
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
  return {
    players:
      setup === false
        ? updatePlayerResources(players, newDiceRoll, tiles, chits)
        : players,
    currentPlayerIndex: (currentPlayerIndex + 1) % 4,
    setup: currentPlayerIndex !== 3 ? setup : false,
    diceRoll: newDiceRoll
  };
};

export const handleAddCity = (
  cities,
  cityIndex,
  currentPlayerIndex,
  players
) => {
  let newCities = [...cities];
  let newPlayers = players;
  if (newCities[cityIndex] === "") {
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
    newPlayers[currentPlayerIndex].gamePoints++;
  }
  return {
    cities: newCities,
    players: newPlayers
  };
};

export const handleAddRoad = (
  roads,
  roadIndex,
  currentPlayerIndex,
  players
) => {
  let newRoads = [...roads];
  let newPlayers = players;
  if (newRoads[roadIndex] === "") {
    newRoads[roadIndex] = newPlayers[currentPlayerIndex].name;
    newPlayers[currentPlayerIndex].roads--;
  }
  return {
    roads: newRoads,
    players: newPlayers
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
    (action === "buildRoad" &&
      (players[currentPlayerIndex].resources.Brick < 1 ||
        players[currentPlayerIndex].resources.Lumber < 1)) ||
    (action === "buildCity" &&
      (players[currentPlayerIndex].resources.Ore < 3 ||
        players[currentPlayerIndex].resources.Grain < 2))
  ) {
    return "insufficientResources";
  }
  return action;
};
