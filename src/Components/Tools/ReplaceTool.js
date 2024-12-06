import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { colours } from "constants.js";
import { switchSample, basicImgEffect, section } from "Actions/toolActions";
import { sampleColour } from "Actions/replaceActions";
import { Find, Replace, Tolerance } from "Components/Inputs";
import { CursorIcon, DropperIcon, CursorDropperIcon } from "Images/SvgIcons";

const useStyles = makeStyles((theme) => ({
  replace_button_container: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridGap: theme.spacing(2),
    gridColumn: "1 / -1",
  },
}));

function ReplaceTool() {
  const { replace_button_container } = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const comparisons = useSelector((state) => state.replace.cc);
  const oldVal = useSelector((state) => state.replace.fc);
  const percentages = useSelector((state) => state.replace.fp);
  const operators = useSelector((state) => state.replace.oc);
  const rc = useSelector((state) => state.replace.rc);
  const tolerance = useSelector((state) => state.replace.tc);
  const pixel = useSelector((state) => state.image.pixel);

  const newVal = rc.map((value, index) =>
    operators[index] === "*" || operators[index] === "/"
      ? value / 100 + 1
      : value
  );

  const copy = () => {
    if (pixel) {
      dispatch(sampleColour(...pixel));
    } else {
      enqueueSnackbar(
        "You must specify a pixel first. Click on the cursor icon and then click on a pixel on the canvas to do so.",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        }
      );
    }
  };

  const frt = colours.map((colour, index) => (
    <React.Fragment>
      <Find
        key={"fc" + colour}
        index={index}
        isAlpha={index === colours.length - 1}
      />
      <Replace key={"rc" + colour} index={index} />
      <Tolerance key={"tc" + colour} index={index} />
    </React.Fragment>
  ));

  return (
    <form id="replaceGrid" className="replaceGrid" autoComplete="off">
      <label></label>
      <span>
        <label>Find</label>
        <IconButton
          onClick={() => dispatch(switchSample("PIXEL"))}
          type="button"
          color="primary"
          title="Specify a section on the canvas by clicking on a pixel within that section"
        >
          {CursorIcon}
        </IconButton>
        <IconButton
          onClick={() => dispatch(switchSample("COLOUR"))}
          type="button"
          color="primary"
          title="Sample a pixel's colour off one of the canvases"
        >
          {DropperIcon}
        </IconButton>
        <IconButton
          type="button"
          onClick={copy}
          color="primary"
          title="Copy the selected pixel's colour to the inputs"
        >
          {CursorDropperIcon}
        </IconButton>
      </span>
      <label>Replace</label>
      <label>Tolerance</label>
      <label>Red:</label>
      {frt[0]}
      <label>Green:</label>
      {frt[1]}
      <label>Blue:</label>
      {frt[2]}
      <label>Alpha:</label>
      {frt[3]}
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
    </form>
  );
}

export default ReplaceTool;
