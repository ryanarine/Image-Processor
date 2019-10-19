export const updateInput = (event, index) => ({
  type: "UPDATEINPUT",
  name: event.target.name,
  value: event.target.value,
  index
});

export const updateOption = (index, value, isOperator) => ({ type: "UPDATEOPTION", index, value, isOperator });

export const replaceModal = index => ({ type: "MODAL", index, replace: true });

export const findModal = index => ({ type: "MODAL", index, replace: false });
