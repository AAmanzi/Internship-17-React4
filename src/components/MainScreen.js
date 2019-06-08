import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { appendPlayerNames } from "../redux/modules/game";
import { isNullOrWhitespace } from "../utils";

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerNames: ["", "", "", ""]
    };
  }

  handleChange = (event, index) => {
    const nameValue = event.target.value;
    this.setState(prevState => {
      const newPlayerNames = [...prevState.playerNames];
      newPlayerNames[index] = nameValue;
      return {
        playerNames: [...newPlayerNames]
      };
    });
  };

  handleAppendPlayerNames = () => {
    const { playerNames } = this.state;
    const { players, appendPlayerNames } = this.props;
    const actualPlayerNames = playerNames.filter(
      name => !isNullOrWhitespace(name)
    );
    if (actualPlayerNames.length < 2) {
      alert("The minimum amount of players is 2!");
      return undefined;
    }

    appendPlayerNames(players, actualPlayerNames);

    this.props.history.push("/play");
  };

  render() {
    return (
      <>
        <div className="InputWrapper">
          <h1>Enter player names!</h1>
          {this.props.players.map((player, index) => (
            <input
              className={`NameInput Text${player.colour} Border${
                player.colour
              }`}
              placeholder={`Player ${index + 1}`}
              onChange={event => this.handleChange(event, index)}
              key={index}
            />
          ))}
        </div>
        <button className="StartButton" onClick={this.handleAppendPlayerNames}>
          Start playing!
        </button>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    players: state.game.players
  };
};

const mapDispatchToProps = {
  appendPlayerNames
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainScreen));
