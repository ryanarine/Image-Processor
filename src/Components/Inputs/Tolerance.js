import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useSelector, useDispatch } from "react-redux";
import { colours } from "constants.js";
import { updateInput } from "Actions/replaceActions";

const useStyles = makeStyles({
  root: {
    margin: "auto",
    width: "150px",
  },
});

function Tolerance(props) {
  const index = props.index;
  const dispatch = useDispatch();
  const comparison = useSelector((state) => state.replace.cc[index]);
  const value = useSelector((state) => state.replace.tc[index]);
  const { root } = useStyles();

  return (
    <TextField
      type="number"
      variant="outlined"
      className={root}
      disabled={comparison !== "="}
      value={value}
      onChange={(e) => dispatch(updateInput(e, index))}
      name={"tc" + colours[index]}
      inputProps={{ max: 255, min: 0 }}
    />
  );
}

export default Tolerance;
