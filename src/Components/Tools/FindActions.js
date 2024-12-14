import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { switchSample } from "Actions/toolActions";
import { sampleColour } from "Actions/replaceActions";
import { CursorIcon, DropperIcon, CursorDropperIcon } from "Images/SvgIcons";
import ColorInputs from "../Inputs/ColorInputs";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridAutoFlow: "column",
    gridGap: theme.spacing(2),
    width: "fit-content",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
}));

function FindActions() {
  const { enqueueSnackbar } = useSnackbar();
  const { root } = useStyles();

  const dispatch = useDispatch();
  const pixel = useSelector((state) => state.image.pixel);

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

  return (
    <div className={root}>
      <Typography>Find</Typography>
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
      <ColorInputs prefix="fc" />
    </div>
  );
}

export default FindActions;
