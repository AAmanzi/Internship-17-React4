import React, { Component } from "react";
import { connect } from "react-redux";
import { nextPlayer, setAction } from "../redux/modules/game";
import { actionTypes } from "../constants";
import Board from "./Board";

class Game extends Component {
  render() {
    const { activeAction, setup, currentPlayerIndex, players } = this.props;

    return (
      <div className="Game">
        <div className="GamePanel">
          <h1>
            Currently playing:{" "}
            <b className={`Text${players[currentPlayerIndex].name}`}>
              {players[currentPlayerIndex].name}
            </b>
          </h1>
          {/* <h2>{`Dice roll: ${getDiceRoll()}`}</h2> */}
          <div className="ActionContainer">
            {actionTypes.map((action, index) => {
              return(
              <button
                className={`Action ${
                  activeAction === action.type ? "SelectedAction" : ""
                }`}
                onClick={() => this.props.setAction(action.type)}
                key={index}
              >
                {action.value}
              </button>
            )})}
          </div>
          <button
            onClick={() =>
              this.props.nextPlayer(players, currentPlayerIndex, setup)
            }
          >
            Finish turn
          </button>
        </div>
        <Board
          currentPlayerIndex={currentPlayerIndex}
          players={players}
          setup={setup}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeAction: state.game.activeAction,
    setup: state.game.setup,
    currentPlayerIndex: state.game.currentPlayerIndex,
    players: state.game.players
  };
};

const mapDispatchToProps = {
  nextPlayer,
  setAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
