import React from "react";
import { TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { colours } from "constants.js";
import { updateInput } from "Actions/replaceActions";

function ToleranceV2(props) {
  const index = props.index;
  const dispatch = useDispatch();
  const value = useSelector((state) => state.replace.tc[index]);
  return (
    <TextField
      type="number"
      variant="outlined"
      value={value}
      onChange={(e) => dispatch(updateInput(e, index))}
      name={"tc" + colours[index]}
      inputProps={{ max: 255, min: 0 }}
    />
  );
}

export default ToleranceV2;
