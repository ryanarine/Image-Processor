import {
  Button,
  ButtonGroup,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { updateInput, updateOption } from "Actions/replaceActions";
import { colours, fullColours, operators } from "constants.js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    gap: `${theme.spacing(1)}px`,
  },
}));

const mapOperatorToTitle = (operator, value, index) => {
  let colour = fullColours[index];
  var msg = "";
  switch (operator) {
    case "=":
      msg = `Change the ${colour} value of the selected pixels to ${value}`;
      break;
    case "+":
      msg = `Increase the ${colour} value of the selected pixels by ${value}`;
      break;
    case "-":
      msg = `Decrease the ${colour} value of the selected pixels by ${value}`;
      break;
    case "*":
      msg = `Multiply the ${colour} value of the selected pixels by ${value / 100 + 1}`;
      break;
    case "/":
      msg = `Divide the ${colour} value of the selected pixels by ${value / 100 + 1}`;
      break;
    default:
      return "";
  }
  return msg;
};

function ReplaceV2(props) {
  const index = props.index;
  const { root } = useStyles();
  const operator = useSelector((state) => state.replace.oc[index]);
  const value = useSelector((state) => state.replace.rc[index]);
  const dispatch = useDispatch();

  let isPercentageOp = operator === "*" || operator === "/" ? "%" : "";

  return (
    <div className={root}>
      <ButtonGroup variant="contained">
        {operators.map((option) => (
          <Button
            key={option}
            onClick={() => dispatch(updateOption(index, option, true))}
            title={mapOperatorToTitle(option, value, index)}
            color={operator === option ? "primary" : "default"}
          >
            {option}
          </Button>
        ))}
      </ButtonGroup>
      <TextField
        type="number"
        variant="outlined"
        value={value}
        onChange={(e) => dispatch(updateInput(e, index))}
        name={"rc" + colours[index]}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography variant="button">
                {isPercentageOp ? "%" : "#"}
              </Typography>
            </InputAdornment>
          ),
        }}
        inputProps={{ max: isPercentageOp ? 500 : 255, min: 0 }}
      />
    </div>
  );
}

export default ReplaceV2;
