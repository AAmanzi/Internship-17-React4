import React from "react";

const Road = props => {
  return (
    <div
      className={`Road ${props.classAlt}`}
      onClick={props.handleClick}
    >
      {props.direction === "climb" ? (
        <svg width="57.5" height="35">
          <line className={props.colour} x1="0" y1="35" x2="57.5" y2="0" />
        </svg>
      ) : props.direction === "descent" ? (
        <svg width="57.5" height="35">
          <line className={props.colour} x1="0" y1="0" x2="57.5" y2="35" />
        </svg>
      ) : (
        <svg width="15" height="55">
          <line className={props.colour} x1="7.5" y1="0" x2="7.5" y2="55" />
        </svg>
      )}
    </div>
  );
};

export default Road;
