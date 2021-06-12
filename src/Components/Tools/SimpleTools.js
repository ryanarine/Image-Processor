import React from "react";
import { useDispatch } from "react-redux";
import { basicImgEffect } from "Actions/toolActions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Lighten from "./Lighten";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(8, auto)",
    gridGap: theme.spacing(2),
    alignItems: "center",
    maxWidth: "40em",
    margin: "auto"
  }
}));

function SimpleTools() {
  const { root } = useStyles();

  const dispatch = useDispatch();

  return (
    <div className={root}>
      <Button variant="contained" color="secondary" onClick={() => dispatch(basicImgEffect("GRAYSCALE"))}>
        Grayscale
      </Button>
      <Button variant="contained" color="secondary" onClick={() => dispatch(basicImgEffect("NEGATIVE"))}>
        Negative
      </Button>
      <Lighten multiplier={ratio => ratio / 100 + 1} />
      <Lighten multiplier={ratio => 100 / (ratio + 100)} text={"Darken"} />
    </div>
  );
}

export default SimpleTools;
