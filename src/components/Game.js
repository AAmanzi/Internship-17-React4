import React, { Component } from "react";
import { getRandomTiles, getRandomChits } from "../utils";
import { boardTileRows, boardCityRows, startCities } from "../constants";
import Tile from "./Tile";
import City from "./City";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: startCities
    };
  }

  render() {
    const tiles = getRandomTiles();
    const chits = getRandomChits();
    return (
      <div className="Board">
        {boardTileRows.map((row, i) => (
          <div className="BoardRow" key={i}>
            {tiles.slice(row.start, row.stop).map((tile, j) => (
              <Tile colour={tile} value={chits[j]} key={j} />
            ))}
          </div>
        ))}
        <div className="BoardCities">
          {boardCityRows.map((row, i) => (
            <div className={`CityRow ${i % 2 ? "CityRowAlt" : ""}`} key={i}>
              {this.state.cities.slice(row.start, row.stop).map((city, j) => (
                <City colour={city} key={j}/>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Game;
