import React from "react";

const City = props => {
  return <div className={`City ${props.colour}`} onClick={props.handleClick} />;
};

export default City;
