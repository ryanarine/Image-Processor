import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePixel, switchSample, center } from "Actions/toolActions";
import { sampleColour } from "Actions/replaceActions";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Transparent from "Images/transparent.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${Transparent})`
  },
  box: {
    width: "400px",
    height: "300px"
  }
}));

function Canvas({ canvasId }) {
  const { root, box } = useStyles();

  console.log("CANVAS");

  const dispatch = useDispatch();
  const imgData = useSelector(state => state.imgData);
  const pixelSample = useSelector(state => state.pixelSample);
  const colourSample = useSelector(state => state.colourSample);
  const x1 = useSelector(state => state.x1);
  const y1 = useSelector(state => state.y1);

  // Center the image on canvas to the clicked point
  const recenter = event => {
    const canvas = event.target;
    if (imgData && (imgData.width > canvas.width || imgData.height > canvas.height)) {
      dispatch(center(canvas, event.pageX, event.pageY));
    }
  };

  const handleClick = event => {
    if (imgData && (pixelSample || colourSample)) {
      const canvas = event.target;
      const [ratioX, ratioY] = [canvas.width / canvas.scrollWidth, canvas.height / canvas.scrollHeight];
      const point = [
        Math.round((event.pageX - canvas.offsetLeft) * ratioX + x1),
        Math.round((event.pageY - canvas.offsetTop) * ratioY + y1)
      ];
      if (point[0] >= 0 && point[0] <= imgData.width && point[1] >= 0 && point[1] <= imgData.height) {
        const r = imgData.data[point[1] * imgData.width * 4 + point[0] * 4];
        const g = imgData.data[point[1] * imgData.width * 4 + point[0] * 4 + 1];
        const b = imgData.data[point[1] * imgData.width * 4 + point[0] * 4 + 2];
        const a = imgData.data[point[1] * imgData.width * 4 + point[0] * 4 + 3];
        if (pixelSample) {
          const pixel = [r, g, b, a, point[0], point[1]];
          dispatch(updatePixel(pixel));
        } else {
          dispatch(sampleColour(r, g, b, a));
        }
      }
    } else if (pixelSample) {
      dispatch(switchSample("PIXEL"));
      alert("You must upload an image first. Click the upload button to upload an image.");
    } else {
      recenter(event);
    }
  };

  return (
    <Paper className={`${root} ${box}`} elevation={5}>
      <canvas id={canvasId} className={box} onClick={handleClick}></canvas>
    </Paper>
  );
}

export default Canvas;
