import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { basicImgEffect } from "Actions/toolActions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const MAX_VALUE = 500;

const useStyles = makeStyles(() => ({
  input: {
    width: "10ch",
  },
}));

function Lighten(props) {
  const { text, multiplier } = props;
  const { input } = useStyles();

  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    let val = e.target.value;
    if (!isNaN(val) && val >= 0 && val <= MAX_VALUE) {
      val = Number(Number(val).toFixed());
      setValue(val);
    }
  };

  const handleClick = () => {
    dispatch(basicImgEffect("BRIGHT", [multiplier(value)]));
  };
  return (
    <>
      <Button onClick={handleClick} color="secondary" variant="contained">
        {text || "Lighten"}
      </Button>

      <TextField
        type="number"
        variant="outlined"
        value={value}
        onChange={handleChange}
        className={input}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
        inputProps={{ max: MAX_VALUE, min: 0 }}
      />
    </>
  );
}

export default Lighten;
