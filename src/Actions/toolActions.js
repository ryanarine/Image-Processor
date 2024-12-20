export const setImgData = (isNewCanvas, data) => (dispatch) => {
  dispatch({ type: "SET", isNewCanvas, data });
  return Promise.resolve();
};

export const setFileName = (name) => ({ type: "NAME", name });

export const refresh = () => ({ type: "REFRESH" });

export const updatePixel = (pixel) => ({ type: "PIXEL", pixel });

export const switchSample = (sample) => ({ type: "SAMPLE", sample });

export const basicImgEffect = (effect, payload) => ({
  type: "BASIC",
  effect,
  payload,
});

export const section = (
  comparisons,
  oldVal,
  percentages,
  operators,
  newVal,
  tolerance,
) => ({
  type: "SECTION",
  comparisons,
  oldVal,
  percentages,
  operators,
  newVal,
  tolerance,
});

export const swap = (copyToNew) => ({ type: "SWAP", copyToNew });

export const zoom = (isZoomOut, isNewCanvas) => ({
  type: "ZOOM",
  isZoomOut,
  isNewCanvas,
});

export const center = (canvas, pageX, pageY) => ({
  type: "CENTER",
  canvas,
  pageX,
  pageY,
});
