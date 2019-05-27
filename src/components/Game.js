import React, { Component } from "react";
import { startCities, startRoads } from "../constants";
import { getDiceRoll } from "../utils";
import { getRandomTiles, getRandomChits } from "../utils";
import Board from "./Board";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: getRandomTiles(),
      chits: getRandomChits(),
      cities: startCities,
      roads: startRoads,
      playerTurn: "Red"
    };
  }

  handleCityClick = index => {
    this.setState(prevState => {
      let newCities = [...prevState.cities];
      newCities[index] = prevState.playerTurn;

      return {
        ...prevState,
        cities: newCities
      };
    });
  };

  handleRoadClick = index => {
    this.setState(prevState => {
      let newRoads = [...prevState.roads];
      newRoads[index] = prevState.playerTurn;

      return {
        ...prevState,
        roads: newRoads
      };
    });
  };

  render() {
    return (
      <div className="Game">
        <div className="GamePanel">
          <h1>
            Currently playing:{" "}
            <b className={`Text${this.state.playerTurn}`}>
              {this.state.playerTurn}
            </b>
          </h1>
          {/* <h2>{`Dice roll: ${getDiceRoll()}`}</h2> */}
        </div>
        <Board
          tiles={this.state.tiles}
          chits={this.state.chits}
          cities={this.state.cities}
          roads={this.state.roads}
          handleCityClick={this.handleCityClick}
          handleRoadClick={this.handleRoadClick}
        />
      </div>
    );
  }
}

export default Game;
