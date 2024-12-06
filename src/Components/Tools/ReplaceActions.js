import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    height: 48,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function ReplaceActions() {
  const { root } = useStyles();

  return (
    <div className={root}>
      <Typography>Replace</Typography>
    </div>
  );
}

export default ReplaceActions;
