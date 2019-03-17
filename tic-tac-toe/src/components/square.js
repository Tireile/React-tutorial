import React from "react";

export default function Square(props) {
  let classes = "square";
  if (props.win) {
    classes += " red"
  }

  return (
    <button className={classes} onClick={props.onClick}>
      {props.value}
    </button>
  );
}
