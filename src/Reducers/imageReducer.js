import { grayscale, negative, lighten, changeImgData, getSection } from "../ToolFunctions";

export const initialState = {
  imgData: null,
  newData: null,
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0,
  sample: false,
  pixel: null
};

const mapEffectToFunction = { GRAYSCALE: grayscale, NEGATIVE: negative, BRIGHT: lighten, REPLACE: changeImgData };

function imageReducer(state = initialState, action) {
  switch (action.type) {
    case "SET":
      return action.isNewCanvas ? { ...state, newData: action.data } : { ...state, imgData: action.data };
    case "REFRESH":
      return { ...state, x1: 0, x2: 0, y1: 0, y2: 0, sample: false, pixel: null };
    case "POINT":
      return action.isNewCanvas ? { ...state, x2: action.x, y2: action.y } : { ...state, x1: action.x, y1: action.y };
    case "PIXEL":
      changeCursor(state.sample);
      return action.pixel ? { ...state, sample: false, pixel: action.pixel } : { ...state, sample: false };
    case "SAMPLE":
      changeCursor(state.sample);
      return { ...state, sample: !state.sample };
    case "BASIC":
      if (state.newData) {
        let effect = mapEffectToFunction[action.effect];
        copy(state.imgData.data, state.newData.data);
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
        ctx.putImageData(imgFile, -x, -y, x, y, canvas.scrollWidth, canvas.scrollHeight);
        let data = new Uint8ClampedArray(imgFile.data);
        let copy = new ImageData(data, imgFile.width, imgFile.height);
        return action.copyToNew ? { ...state, newData: copy } : { ...state, imgData: copy };
      }
      return state;
    }
    default:
      return state;
  }
}

// Redraw the new canvas
function redraw(x, y, data) {
  let canvas = document.getElementById("newCanvas");
  canvas.getContext("2d").putImageData(data, -x, -y, x, y, canvas.scrollWidth, canvas.scrollHeight);
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
