import { grayscale, negative, lighten, changeImgData, getSection } from "../ToolFunctions";

export const initialState = {
  imgData: null,
  newData: null,
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0,
  sample: false,
  pixel: null,
  zoom1: 0,
  zoom2: 0
};

const mapEffectToFunction = { GRAYSCALE: grayscale, NEGATIVE: negative, BRIGHT: lighten, REPLACE: changeImgData };
const smallestSize = 50;
const zoomRatio = 1.5;

function imageReducer(state = initialState, action) {
  switch (action.type) {
    case "SET":
      return action.isNewCanvas ? { ...state, newData: action.data } : { ...state, imgData: action.data };
    case "REFRESH":
      return { ...state, x1: 0, x2: 0, y1: 0, y2: 0, sample: false, pixel: null, zoom1: 0, zoom2: 0 };
    case "CENTER":
      let canvas = action.canvas;
      let [x, y, imgData] =
        canvas.id === "canvas" ? [state.x1, state.y1, state.imgData] : [state.x2, state.y2, state.newData];
      // Get the appropriate center point
      let point = centerPoint(action.canvas, x, y, imgData.width, imgData.height, action.pageX, action.pageY);
      // Recenter image if the center point has changed
      if (point[0] !== x || point[1] !== y) {
        let ctx = canvas.getContext("2d");
        // Update state
        canvas.id === "newCanvas" ? ([state.x2, state.y2] = point) : ([state.x1, state.y1] = point);
        // Construct the recentered image data
        let [width1, height1] = [imgData.width, imgData.height];
        let [width2, height2] = [width1 - point[0], height1 - point[1]];
        // Construct only the parts we need
        width2 = Math.min(canvas.width, width2);
        height2 = Math.min(canvas.height, height2);
        let data = new Uint8ClampedArray(width2 * height2 * 4);
        // Copy the image data
        for (let row = 0; row < height2; row++) {
          for (let col = 0; col < width2; col++) {
            for (let val = 0; val < 4; val++) {
              data[row * width2 * 4 + col * 4 + val] =
                imgData.data[(point[1] + row) * width1 * 4 + (point[0] + col) * 4 + val];
            }
          }
        }
        // Draw image
        imgData = new ImageData(data, width2, height2);
        ctx.putImageData(imgData, 0, 0);
      }
      return state;
    case "PIXEL":
      changeCursor(state.sample);
      return { ...state, sample: false, pixel: action.pixel };
    case "SAMPLE":
      changeCursor(state.sample);
      return { ...state, sample: !state.sample };
    case "BASIC":
      if (state.newData) {
        // Get the effect
        let effect = mapEffectToFunction[action.effect];
        // Copy old data to new data
        copy(state.imgData.data, state.newData.data);
        // Apply effect and redraw
        if (action.payload) {
          effect(state.newData.data, ...action.payload);
        } else {
          effect(state.newData.data);
        }
        redraw(state.x2, state.y2, state.newData);
      }
      return state;
    case "SECTION": {
      if (state.pixel && state.newData) {
        let section = getSection(state.imgData, state.pixel, action.tolerance);
        let data = state.newData.data;
        copy(state.imgData.data, state.newData.data);
        // Replace the colour of each pixel in the section
        let newVal = action.newVal;
        section.forEach(pixel => {
          data[pixel] = newVal[0];
          data[pixel + 1] = newVal[1];
          data[pixel + 2] = newVal[2];
          data[pixel + 3] = newVal[3];
        });
        redraw(state.x2, state.y2, state.newData);
      }
      return state;
    }
    case "SWAP": {
      if (state.imgData) {
        let [canvasName, imgFile, x, y] = action.copyToNew
          ? ["newCanvas", state.imgData, state.x2, state.y2]
          : ["canvas", state.newData, state.x1, state.y1];
        const canvas = document.getElementById(canvasName);
        const ctx = canvas.getContext("2d");
        ctx.putImageData(imgFile, -x, -y, x, y, canvas.width, canvas.height);
        let data = new Uint8ClampedArray(imgFile.data);
        let copy = new ImageData(data, imgFile.width, imgFile.height);
        return action.copyToNew ? { ...state, newData: copy } : { ...state, imgData: copy };
      }
      return state;
    }
    case "ZOOM": {
      if (state.imgData) {
        let [canvasName, imgFile, zoom, x, y] = action.isNewCanvas
          ? ["newCanvas", state.newData, state.zoom2, state.x2, state.y2]
          : ["canvas", state.imgData, state.zoom1, state.x1, state.y1];
        const canvas = document.getElementById(canvasName);
        // Do nothing if the action is zooming out and the canvas completely contains the image unless user has zoomed in before
        // Note: zoom < 0 is only there to maintain consistency (otherwise user might be able to zoom in but not zoom back out)
        if (!action.isZoomOut || zoom < 0 || imgFile.width > canvas.scrollWidth || imgFile.height > canvas.scrollHeight) {
          let newZoom = action.isZoomOut ? zoom + 1 : zoom - 1;
          let mult = zoomRatio ** newZoom;
          // Canvas dimensions is always square so images look appropriate
          let width = Math.round(canvas.scrollWidth * mult);
          // Set zoom bounds while still maintaining consistency
          if ((action.isZoomOut && zoom >= 0) || (!action.isZoomOut && zoom <= 0)) {
            if (!action.isZoomOut && width < smallestSize) {
              width = smallestSize;
            } else if (action.isZoomOut && width >= imgFile.width && width >= imgFile.height) {
              width = Math.max(imgFile.width, imgFile.height);
            }
          }
          // Redraw image if the zoom was valid
          if (width !== canvas.width) {
            // Set the zoom
            canvas.width = canvas.height = width;
            // Top-left pixel might have to change due to boundaries
            [x, y] = boundary([x, y], canvas, imgFile.width, imgFile.height);
            // Update state and redraw
            state = action.isNewCanvas
              ? { ...state, x2: x, y2: y, zoom2: newZoom }
              : { ...state, x1: x, y1: y, zoom1: newZoom };
            redraw(x, y, imgFile, canvasName);
          }
        }
      }
      return state;
    }
    default:
      return state;
  }
}

/*
-x and y are the x and y coordinates of the top left pixel on the canvas
-width and height are the width and height of the canvas image data
-pageX and pageY are the x and y coordinates of the clicked point on the page if there was a clicked point
-Returns the x and y coordinates of the center pixel on the canvas
*/
function centerPoint(canvas, x, y, width, height, pageX, pageY) {
  let halfX = canvas.width / 2;
  let halfY = canvas.height / 2;
  let ratioX = canvas.width / canvas.scrollWidth;
  let ratioY = canvas.height / canvas.scrollHeight;
  // x/y + offsetX/offsetY - offsetLeft/offsetTop = x/y coordinate of clicked point
  // Multiplied by ratioX/ratioY = x/y coordinate of clicked pixel
  // Subtract by half to get the top left coordinate if clicked point was the center
  let point = [
    Math.round(x + (pageX - canvas.offsetLeft) * ratioX - halfX),
    Math.round(y + (pageY - canvas.offsetTop) * ratioY - halfY)
  ];
  // Compensate for boundaries
  return boundary(point, canvas, width, height);
}

// Translates the point if it is off the boundary specified by the canvas and its image data
function boundary(point, canvas, imgWidth, imgHeight) {
  // imgWidth - canvas.width = x-coordinate of leftmost pixels when rightmost pixels are on the boundary
  // imgHeight - canvas.height = y-coordinate of topmost pixels when bottommost pixels are on the boundary
  if (imgWidth < canvas.width || point[0] < 0) {
    point[0] = 0;
  } else {
    point[0] = point[0] > imgWidth - canvas.width ? imgWidth - canvas.width : point[0];
  }
  if (imgHeight < canvas.height || point[1] < 0) {
    point[1] = 0;
  } else {
    point[1] = point[1] > imgHeight - canvas.height ? imgHeight - canvas.height : point[1];
  }
  return point;
}

// Redraw the canvas
function redraw(x, y, data, canvasName = "newCanvas") {
  let canvas = document.getElementById(canvasName);
  canvas.getContext("2d").putImageData(data, -x, -y, x, y, canvas.width, canvas.height);
}

// Copy the image data from data1 into data2
function copy(data1, data2) {
  data1.forEach((pixel, index) => (data2[index] = pixel));
}

// Change the cursor style
function changeCursor(sample) {
  document.getElementById("container").className = sample ? "container" : "container cross";
}

export default imageReducer;
