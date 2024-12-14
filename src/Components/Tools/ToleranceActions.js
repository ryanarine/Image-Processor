import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import ColorInputs from "../Inputs/ColorInputs";

const useStyles = makeStyles({
  root: {
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
  },
});

function ToleranceActions() {
  const { root } = useStyles();

  return (
    <div className={root}>
      <Typography>Tolerance</Typography>
      <ColorInputs prefix="tc" />
    </div>
  );
}

export default ToleranceActions;
