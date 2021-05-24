import React from "react";
import { useDispatch } from "react-redux";
import { basicImgEffect } from "Actions/toolActions";
import Lighten from "./Lighten";

function SimpleTools() {
  const dispatch = useDispatch();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", justifyItems: "center" }}>
      <div>
        <button onClick={() => dispatch(basicImgEffect("GRAYSCALE"))}> Grayscale </button>
        <button onClick={() => dispatch(basicImgEffect("NEGATIVE"))}> Negative </button>
        <Lighten multiplier={ratio => ratio / 100 + 1} />
        <Lighten multiplier={ratio => 100 / (ratio + 100)} text={"Darken"} />
      </div>
    </div>
  );
}

export default SimpleTools;
