import React from "react";

const City = props => {
  return <div className={`City ${props.colour} ${props.isAvailable ? "IsAvailable" : ""}`} onClick={props.handleClick} />;
};

export default City;
