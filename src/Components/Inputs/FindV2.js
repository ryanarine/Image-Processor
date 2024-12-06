import React from "react";
import {
  Button,
  ButtonGroup,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  updateInput,
  updateOption,
  updatePercentage,
} from "Actions/replaceActions";
import { colours, comparisons, fullColours } from "constants.js";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    gap: `${theme.spacing(1)}px`,
  },
}));

const mapCompareToTitle = (compare, value, isPercentage, index) => {
  const colour = fullColours[index];
  const prefix = `Select only pixels that have a ${colour} value`;
  const suffix = isPercentage ? "% of the pixel's total value" : "";
  let middle;
  switch (compare) {
    case "=":
      middle = "that is within the tolerance range of";
      break;
    case ">":
      middle = "greater than";
      break;
    case ">=":
      middle = "greater than or equal to";
      break;
    case "<":
      middle = "less than";
      break;
    case "<=":
      middle = "less than or equal to";
      break;
    default:
      return "";
  }
  return `${prefix} ${middle} ${value}${suffix}`;
};

export default function FindV2(props) {
  const { index, isAlpha } = props;
  const { root } = useStyles();
  const compare = useSelector((state) => state.replace.cc[index]);
  const value = useSelector((state) => state.replace.fc[index]);
  const isPercentage = useSelector((state) => state.replace.fp[index]);
  const dispatch = useDispatch();

  return (
    <div className={root}>
      <ButtonGroup variant="contained">
        {comparisons.map((comparison) => (
          <Button
            key={comparison}
            onClick={() => dispatch(updateOption(index, comparison, false))}
            title={mapCompareToTitle(comparison, value, isPercentage, index)}
            color={compare === comparison ? "primary" : "default"}
          >
            {comparison}
          </Button>
        ))}
      </ButtonGroup>
      <TextField
        type="number"
        variant="outlined"
        fullWidth={isAlpha}
        value={value}
        onChange={(e) => dispatch(updateInput(e, index))}
        name={"fc" + colours[index]}
        {...(!isAlpha && {
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={() => dispatch(updatePercentage(index))}
                  title="Indicate whether the search looks at the absolute or relative value"
                >
                  {isPercentage ? "%" : "#"}
                </Button>
              </InputAdornment>
            ),
          },
        })}
        inputProps={{ max: isPercentage ? 100 : 255, min: 0 }}
      />
    </div>
  );
}
