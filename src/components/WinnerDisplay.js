import React from "react";

const WinnerDisplay = props => {
  return(
    <div className="WinnerDisplay">
      <h1 className={`Text${props.winner.name}`}>{props.winner.name}</h1>
      <h1>wins!</h1>
      <button className="Button">Play again?</button>
    </div>
  )
}

export default WinnerDisplay