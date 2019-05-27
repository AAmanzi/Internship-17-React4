import React from "react";
import { boardTileRows, boardCityRows, boardRoadRows } from "../constants";
import Tile from "./Tile";
import City from "./City";
import Road from "./Road";

const Board = props => {
  const { tiles, chits } = props;
  return (
    <div className="Board">
      {boardTileRows.map((row, i) => (
        <div className="BoardRow" key={i}>
          {tiles.slice(row.start, row.stop).map((tile, j) => (
            <Tile colour={tile} value={chits[row.start + j]} key={j} />
          ))}
        </div>
      ))}
      <div className="BoardCities">
        {boardCityRows.map((row, i) => (
          <div className={`CityRow ${i % 2 ? "CityRowAlt" : ""}`} key={i}>
            {props.cities.slice(row.start, row.stop).map((city, j) => (
              <City
                colour={`Background${city}`}
                key={j}
                handleClick={() => {
                  props.handleCityClick(row.start + j);
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="BoardRoads">
        {boardRoadRows.map((row, i) => (
          <div className="RoadRow" key={i}>
            {props.roads.slice(row.start, row.stop).map((road, j) => (
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
                colour={`Stroke${road}`}
                key={j}
                handleClick={() => {
                  props.handleRoadClick(row.start + j);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
