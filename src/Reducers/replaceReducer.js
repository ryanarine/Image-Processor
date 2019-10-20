const initialState = {
  cc: ["=", "=", "=", "="],
  fc: [255, 255, 255, 255],
  oc: ["=", "=", "=", "="],
  rc: [255, 255, 255, 255],
  tc: [10, 10, 10, 10],
  rModal: [false, false, false, false],
  fModal: [false, false, false, false]
};

function replaceReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATEINPUT": {
      let [name, value, index] = [action.name, action.value, action.index];
      let max = 255;
      if (name.startsWith("r")) {
        let operator = state.oc[index];
        if (operator === "*" || operator === "/") {
          max = 500;
        }
      }
      if (!isNaN(value) && value >= 0 && value <= max) {
        value = Number(Number(value).toFixed());
        state[name.substring(0, 2)][index] = value;
        return state;
      }
      return state;
    }

    case "UPDATEOPTION": {
      let [index, option, isOperator] = [action.index, action.value, action.isOperator];
      if (isOperator && state.rc[index] > 255 && option !== "*" && option !== "/") {
        state.rc[index] = 255;
      }
      if (isOperator) {
        state.oc[index] = option;
      } else {
        state.cc[index] = option;
      }
      return state;
    }

    case "MODAL": {
      for (let i = 0; i < state.rModal.length; i++) {
        state.rModal[i] = false;
        state.fModal[i] = false;
      }
      if (action.index >= 0) {
        action.replace ? (state.rModal[action.index] = true) : (state.fModal[action.index] = true);
      }
      return state;
    }
    case "SAMPLECOLOUR":
      state.fc[0] = action.r;
      state.fc[1] = action.g;
      state.fc[2] = action.b;
      state.fc[3] = action.a;
      return state;
    default:
      return state;
  }
}

export default replaceReducer;
