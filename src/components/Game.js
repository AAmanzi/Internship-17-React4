import React, { Component } from "react";
import { startCities, startRoads, players } from "../constants";
import { getDiceRoll } from "../utils";
import { getRandomTiles, getRandomChits } from "../utils";
import Board from "./Board";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: startCities,
      roads: startRoads,
      currentPlayer: 0,
      players: players
    };
  }

  tiles = getRandomTiles();
  chits = getRandomChits();

  nextPlayer = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        currentPlayer: (prevState.currentPlayer + 1) % 4
      };
    });
  };

  handleCityClick = index => {
    this.setState(prevState => {
      let newCities = [...prevState.cities];
      if (newCities[index] === "") {
        newCities[index] = prevState.players[this.state.currentPlayer].name;
      }
      return {
        ...prevState,
        cities: newCities
      };
    });
  };

  handleRoadClick = index => {
    this.setState(prevState => {
      let newRoads = [...prevState.roads];
      if (newRoads[index] === "") {
        newRoads[index] = prevState.players[this.state.currentPlayer].name;
      }
      return {
        ...prevState,
        roads: newRoads
      };
    });
  };

  render() {
    const currentPlayer = this.state.players[this.state.currentPlayer];
    return (
      <div className="Game">
        <div className="GamePanel">
          <h1>
            Currently playing:{" "}
            <b className={`Text${currentPlayer.name}`}>{currentPlayer.name}</b>
          </h1>
          {/* <h2>{`Dice roll: ${getDiceRoll()}`}</h2> */}
          <button onClick={this.nextPlayer}>Finish turn</button>
        </div>
        <Board
          tiles={this.tiles}
          chits={this.chits}
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
