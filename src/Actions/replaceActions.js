export const updateRGB = ({ prefix, red, green, blue }) => ({
  type: "UPDATERGB",
  prefix,
  red,
  green,
  blue,
});

export const updateInput = (event, index) => ({
  type: "UPDATEINPUT",
  name: event.target.name,
  value: event.target.value,
  index,
});

export const updateOption = (index, value, isOperator) => ({
  type: "UPDATEOPTION",
  index,
  value,
  isOperator,
});

export const updatePercentage = (index) => ({
  type: "UPDATEPERCENTAGE",
  index,
});

export const replaceModal = (index) => ({
  type: "MODAL",
  index,
  replace: true,
});

export const findModal = (index) => ({ type: "MODAL", index, replace: false });

export const sampleColour = (r, g, b, a) => ({
  type: "SAMPLECOLOUR",
  r,
  g,
  b,
  a,
});
