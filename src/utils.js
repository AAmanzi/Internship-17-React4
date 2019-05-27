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
