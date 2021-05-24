import React from "react";
import { useDispatch } from "react-redux";
import { basicImgEffect } from "Actions/toolActions";
import Button from "@material-ui/core/Button";
import Lighten from "./Lighten";

function SimpleTools() {
  const dispatch = useDispatch();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", justifyItems: "center" }}>
      <div>
        <Button onClick={() => dispatch(basicImgEffect("GRAYSCALE"))}> Grayscale </Button>
        <Button onClick={() => dispatch(basicImgEffect("NEGATIVE"))}> Negative </Button>
        <Lighten multiplier={ratio => ratio / 100 + 1} />
        <Lighten multiplier={ratio => 100 / (ratio + 100)} text={"Darken"} />
      </div>
    </div>
  );
}

export default SimpleTools;
