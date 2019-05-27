import React from "react";
import Chit from "./Chit";

const Tile = props => {
  return (
    <div className={`Tile ${props.colour}`}>
      <Chit value={props.colour !== "Desert" ? props.value : ""}/>
    </div>
  );
};

export default Tile;