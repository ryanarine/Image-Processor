import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import ColorInputs from "../Inputs/ColorInputs";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    width: "fit-content",
    gap: `${theme.spacing(2)}px`,
  },
}));

function ReplaceActions() {
  const { root } = useStyles();

  return (
    <div className={root}>
      <Typography>Replace</Typography>
      <ColorInputs prefix="rc" />
    </div>
  );
}

export default ReplaceActions;
