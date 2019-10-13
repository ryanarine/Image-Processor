export const setImgData = (isNewCanvas, data) => dispatch => {
  dispatch({ type: "SET", isNewCanvas, data });
  return Promise.resolve();
};

export const refresh = () => ({ type: "REFRESH" });

export const updatePoint = (isNewCanvas, x, y) => ({ type: "POINT", isNewCanvas, x, y });

export const updatePixel = (pixel = null) => ({ type: "PIXEL", pixel });

export const switchSample = () => ({ type: "SAMPLE" });

export const basicImgEffect = (effect, payload) => ({ type: "BASIC", effect, payload });

export const section = (newVal, tolerance) => ({ type: "SECTION", newVal, tolerance });

export const swap = copyToNew => ({ type: "SWAP", copyToNew });
