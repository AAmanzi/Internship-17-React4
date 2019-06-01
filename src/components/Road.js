import React from "react";

const Road = props => {
  return (
    <div className={`Road ${props.classAlt}`} onClick={props.handleClick}>
      {props.direction === "climb" ? (
        <svg width="57.5" height="35">
          <line
            className={`${props.colour} ${
              props.isAvailable ? "IsAvailable" : ""
            }`}
            x1="6"
            y1="31"
            x2="45"
            y2="8"
          />
        </svg>
      ) : props.direction === "descent" ? (
        <svg width="57.5" height="35">
          <line
            className={`${props.colour} ${
              props.isAvailable ? "IsAvailable" : ""
            }`}
            x1="12.5"
            y1="7"
            x2="50"
            y2="30"
          />
        </svg>
      ) : (
        <svg width="15" height="55">
          <line
            className={`${props.colour} ${
              props.isAvailable ? "IsAvailable" : ""
            }`}
            x1="7.5"
            y1="0"
            x2="7.5"
            y2="55"
          />
        </svg>
      )}
    </div>
  );
};

export default Road;
