export const tiles = [
  "Hill",
  "Hill",
  "Hill",
  "Pasture",
  "Pasture",
  "Pasture",
  "Pasture",
  "Mountain",
  "Mountain",
  "Mountain",
  "Field",
  "Field",
  "Field",
  "Field",
  "Forest",
  "Forest",
  "Forest",
  "Forest",
  "Desert"
];

export const tileResource = {
  Hill: "Brick",
  Pasture: "Wool",
  Mountain: "Ore",
  Field: "Grain",
  Forest: "Lumber",
  Desert: ""
}

export const boardTileRows = [
  { start: 0, stop: 3 },
  { start: 3, stop: 7 },
  { start: 7, stop: 12 },
  { start: 12, stop: 16 },
  { start: 16, stop: 19 }
];

export const chits = [
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  8,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12
];

export const startCities = Array(54).fill("")

export const boardCityRows = [
  { start: 0, stop: 3 },
  { start: 3, stop: 7 },
  { start: 7, stop: 11 },
  { start: 11, stop: 16 },
  { start: 16, stop: 21 },
  { start: 21, stop: 27 },
  { start: 27, stop: 33 },
  { start: 33, stop: 38 },
  { start: 38, stop: 43 },
  { start: 43, stop: 47 },
  { start: 47, stop: 51 },
  { start: 51, stop: 54 }
];

export const startRoads = Array(72).fill("")

export const boardRoadRows = [
  { start: 0, stop: 6 },
  { start: 6, stop: 10 },
  { start: 10, stop: 18 },
  { start: 18, stop: 23 },
  { start: 23, stop: 33 },
  { start: 33, stop: 39 },
  { start: 39, stop: 49 },
  { start: 49, stop: 54 },
  { start: 54, stop: 62 },
  { start: 62, stop: 66 },
  { start: 66, stop: 72 }
];

export const tileAdjacentCities = [
  { tile: 0, cities: [0, 3, 4, 7, 8, 12] },
  { tile: 1, cities: [1, 4, 5, 8, 9, 13] },
  { tile: 2, cities: [2, 5, 6, 9, 10, 14] },
  { tile: 3, cities: [7, 11, 12, 16, 17, 22] },
  { tile: 4, cities: [8, 12, 13, 17, 18, 23] },
  { tile: 5, cities: [9, 13, 14, 18, 19, 24] },
  { tile: 6, cities: [10, 14, 15, 19, 20, 25] },
  { tile: 7, cities: [16, 21, 22, 27, 28, 33] },
  { tile: 8, cities: [17, 22, 23, 28, 29, 34] },
  { tile: 9, cities: [18, 23, 24, 29, 30, 35] },
  { tile: 10, cities: [19, 24, 25, 30, 31, 36] },
  { tile: 11, cities: [20, 25, 26, 31, 32, 37] },
  { tile: 12, cities: [28, 33, 34, 38, 39, 43] },
  { tile: 13, cities: [29, 34, 35, 39, 40, 44] },
  { tile: 14, cities: [30, 35, 36, 40, 41, 45] },
  { tile: 15, cities: [31, 36, 37, 41, 42, 46] },
  { tile: 16, cities: [39, 43, 44, 47, 48, 51] },
  { tile: 17, cities: [40, 44, 45, 48, 49, 52] },
  { tile: 18, cities: [41, 45, 46, 49, 50, 53] }
];

export const cityAdjacentRoads = [
  [0, 1],
  [2, 3],
  [4, 5],
  [0, 6],
  [1, 2, 7],
  [3, 4, 8],
  [5, 9],
  [6, 10, 11],
  [7, 12, 13],
  [8, 14, 15],
  [9, 16, 17],
  [10, 18],
  [11, 12, 19],
  [13, 14, 20],
  [15, 16, 21],
  [17, 22],
  [18, 23, 24],
  [19, 25, 26],
  [20, 27, 28],
  [21, 29, 30],
  [22, 31, 32],
  [23, 33],
  [24, 25, 34],
  [26, 27, 35],
  [28, 29, 36],
  [30, 31, 37],
  [32, 38],
  [33, 39],
  [34, 40, 41],
  [35, 42, 43],
  [36, 44, 45],
  [37, 46, 47],
  [38, 48],
  [39, 40, 49],
  [41, 42, 50],
  [43, 44, 51],
  [45, 46, 52],
  [47, 48, 53],
  [49, 54],
  [50, 55, 56],
  [51, 57, 58],
  [52, 59, 60],
  [53, 61],
  [54, 55, 62],
  [56, 57, 63],
  [58, 59, 64],
  [60, 61, 65],
  [62, 66],
  [63, 67, 68],
  [64, 69, 70],
  [65, 71],
  [66, 67],
  [68, 69],
  [70, 71]
];

export const players = [
  {
    name: "",
    colour: "Red",
    settlements: 5,
    cities: 4,
    roads: 15,
    resources: {
      Brick: 0,
      Wool: 0,
      Ore: 0,
      Grain: 0,
      Lumber: 0
    },
    gamePoints: 0,
    tilesAffectedBy: []
  },
  {
    name: "",
    colour: "Blue",
    settlements: 5,
    cities: 4,
    roads: 15,
    resources: {
      Brick: 0,
      Wool: 0,
      Ore: 0,
      Grain: 0,
      Lumber: 0
    },
    gamePoints: 0,
    tilesAffectedBy: []
  },
  {
    name: "",
    colour: "Green",
    settlements: 5,
    cities: 4,
    roads: 15,
    resources: {
      Brick: 0,
      Wool: 0,
      Ore: 0,
      Grain: 0,
      Lumber: 0
    },
    gamePoints: 0,
    tilesAffectedBy: []
  },
  {
    name: "",
    colour: "Yellow",
    settlements: 5,
    cities: 4,
    roads: 15,
    resources: {
      Brick: 0,
      Wool: 0,
      Ore: 0,
      Grain: 0,
      Lumber: 0
    },
    gamePoints: 0,
    tilesAffectedBy: []
  }
];

export const actionTypes = [
  { type: "buildSettlement", value: "Build settlement" },
  { type: "buildRoad", value: "Build road" },
  { type: "buildCity", value: "Build city" }
];
