import React, { Component } from "react";
import { connect } from "react-redux";
import { nextPlayer, setAction } from "../redux/modules/game";
import { actionTypes } from "../constants";
import { getWinner } from "../utils";
import Board from "./Board";
import WinnerDisplay from "./WinnerDisplay";

class Game extends Component {
  render() {
    const {
      activeAction,
      setup,
      currentPlayerIndex,
      players,
      diceRoll,
      tiles,
      chits
    } = this.props;

    const winner = getWinner(players);

    if (winner !== undefined) {
      return <WinnerDisplay winner={winner} />;
    }

    return (
      <div className="Game">
        <div className="GamePanel">
          <h1>
            Currently playing:{" "}
            <b className={`Text${players[currentPlayerIndex].name}`}>
              {players[currentPlayerIndex].name}
            </b>
          </h1>
          {setup === false ? <h2>{`Dice roll: ${diceRoll}`}</h2> : null}
          <div className="ActionContainer">
            {actionTypes.map((action, index) => {
              if (setup === true && action.type === "buildCity") {
                return null;
              }
              return (
                <button
                  className={`Action ${
                    activeAction === action.type ? "SelectedAction" : ""
                  }`}
                  onClick={() =>
                    this.props.setAction(
                      action.type,
                      setup,
                      currentPlayerIndex,
                      players
                    )
                  }
                  key={index}
                >
                  {action.value}
                </button>
              );
            })}
          </div>

          {activeAction === "insufficientResources" ? (
            <div className="TextRed">Insufficient resources</div>
          ) : null}

          <div className="ResourceContainer">
            <div className="Resource">{`Brick: ${
              players[currentPlayerIndex].resources.Brick
            }`}</div>
            <div className="Resource">{`Wool: ${
              players[currentPlayerIndex].resources.Wool
            }`}</div>
            <div className="Resource">{`Ore: ${
              players[currentPlayerIndex].resources.Ore
            }`}</div>
            <div className="Resource">{`Grain: ${
              players[currentPlayerIndex].resources.Grain
            }`}</div>
            <div className="Resource">{`Lumber: ${
              players[currentPlayerIndex].resources.Lumber
            }`}</div>
          </div>

          <button
            onClick={() =>
              this.props.nextPlayer(
                players,
                currentPlayerIndex,
                setup,
                tiles,
                chits
              )
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
    players: state.game.players,
    diceRoll: state.game.diceRoll,
    tiles: state.board.tiles,
    chits: state.board.chits
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
