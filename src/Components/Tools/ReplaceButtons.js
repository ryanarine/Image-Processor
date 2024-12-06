import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { basicImgEffect, section } from "Actions/toolActions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  replace_button_container: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridGap: theme.spacing(2),
    gridColumn: "1 / -1",
  },
}));

function ReplaceButtons() {
  const { replace_button_container } = useStyles();

  const dispatch = useDispatch();
  const comparisons = useSelector((state) => state.replace.cc);
  const oldVal = useSelector((state) => state.replace.fc);
  const percentages = useSelector((state) => state.replace.fp);
  const operators = useSelector((state) => state.replace.oc);
  const rc = useSelector((state) => state.replace.rc);
  const tolerance = useSelector((state) => state.replace.tc);

  const newVal = rc.map((value, index) =>
    operators[index] === "*" || operators[index] === "/"
      ? value / 100 + 1
      : value
  );

  return (
    <div className={replace_button_container}>
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          dispatch(
            basicImgEffect("REPLACE", [
              comparisons,
              oldVal,
              percentages,
              operators,
              newVal,
              tolerance,
            ])
          )
        }
      >
        Replace Colour
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          dispatch(
            section(
              comparisons,
              oldVal,
              percentages,
              operators,
              newVal,
              tolerance
            )
          )
        }
      >
        Replace Section Colour
      </Button>
    </div>
  );
}

export default ReplaceButtons;
