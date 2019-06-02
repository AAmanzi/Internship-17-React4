import React from "react";
import { connect } from "react-redux";
import { getAvailableRoads } from "../utils";
import { boardTileRows, boardCityRows, boardRoadRows } from "../constants";
import { addCity, addRoad } from "../redux/modules/board";
import Tile from "./Tile";
import City from "./City";
import Road from "./Road";

const Board = props => {
  const {
    activeAction,
    tiles,
    chits,
    roads,
    cities,
    currentPlayerIndex,
    players,
    setup,
    upgradedCities
  } = props;

  const availableRoads = getAvailableRoads(roads, cities, players[currentPlayerIndex]);

  return (
    <div className="Board">
      {boardTileRows.map((row, i) => (
        <div className="BoardRow" key={i}>
          {tiles.slice(row.start, row.stop).map((tile, j) => (
            <Tile colour={tile} value={chits[row.start + j]} key={j} />
          ))}
        </div>
      ))}
      <div
        className={`BoardCities ${
          activeAction === "buildSettlement" ? "IsActive" : ""
        }`}
      >
        {boardCityRows.map((row, i) => (
          <div className={`CityRow ${i % 2 ? "CityRowAlt" : ""}`} key={i}>
            {cities.slice(row.start, row.stop).map((city, j) => (
              <City
                isCity={upgradedCities.includes(row.start + j)}
                isAvailable={
                  (activeAction === "buildSettlement" && city === "") ||
                  (activeAction === "buildCity" &&
                    city === players[currentPlayerIndex].name)
                }
                colour={`Background${city}`}
                key={j}
                handleClick={() => {
                  props.addCity(
                    cities,
                    row.start + j,
                    currentPlayerIndex,
                    players,
                    setup,
                    activeAction,
                    upgradedCities
                  );
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div
        className={`BoardRoads ${
          activeAction === "buildRoad" ? "IsActive" : ""
        }`}
      >
        {boardRoadRows.map((row, i) => (
          <div className="RoadRow" key={i}>
            {roads.slice(row.start, row.stop).map((road, j) => (
              <Road
                direction={
                  i % 2
                    ? ""
                    : i < boardRoadRows.length / 2
                    ? j % 2
                      ? "descent"
                      : "climb"
                    : j % 2
                    ? "climb"
                    : "descent"
                }
                classAlt={i % 2 ? "RoadAlt" : ""}
                isAvailable={
                  activeAction === "buildRoad" &&
                  road === "" &&
                  availableRoads.includes(row.start + j)
                }
                colour={`Stroke${road}`}
                key={j}
                handleClick={() => {
                  props.addRoad(
                    roads,
                    row.start + j,
                    currentPlayerIndex,
                    players,
                    setup,
                    activeAction,
                    availableRoads
                  );
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    activeAction: state.game.activeAction,
    tiles: state.board.tiles,
    chits: state.board.chits,
    cities: state.board.cities,
    roads: state.board.roads,
    upgradedCities: state.board.upgradedCities
  };
};

const mapDispatchToProps = {
  addCity,
  addRoad
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
