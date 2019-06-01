import { tiles, chits } from "./constants";

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

export const getDiceRoll = () => {
  return Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1);
};

export const handleNextPlayer = (currentPlayerIndex, setup) => {
  return {
    currentPlayerIndex: (currentPlayerIndex + 1) % 4,
    setup: currentPlayerIndex !== 3 ? setup : false
  };
};

export const handleAddCity = (cities, cityIndex, currentPlayerIndex, players) => {
  let newCities = [...cities];
  let newPlayers = players;
  if (newCities[cityIndex] === "") {
    newCities[cityIndex] = newPlayers[currentPlayerIndex].name;
    newPlayers[currentPlayerIndex].settlements--;
  }
  return {
    cities: newCities,
    players: newPlayers
  };
};

export const handleAddRoad = (roads, roadIndex, currentPlayerIndex, players) => {
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
