import { convertToPercentage } from "utils";

// @TODO: remvoe modal props
const initialState = {
  cc: ["=", "=", "=", "="],
  fc: [255, 255, 255, 255],
  fp: [false, false, false, false],
  oc: ["=", "=", "=", "="],
  rc: [255, 255, 255, 255],
  tc: [10, 10, 10, 10],
  rModal: [false, false, false, false],
  fModal: [false, false, false, false],
};

function replaceReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATERGB": {
      const { prefix, red, green, blue } = action;
      state[prefix] = [red, green, blue, state[prefix][3]];
      return state;
    }

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
        state[name.substring(0, 2)] = [...state[name.substring(0, 2)]];
        return state;
      }
      return state;
    }

    case "UPDATEOPTION": {
      let [index, option, isOperator] = [
        action.index,
        action.value,
        action.isOperator,
      ];
      if (
        isOperator &&
        state.rc[index] > 255 &&
        option !== "*" &&
        option !== "/"
      ) {
        state.rc[index] = 255;
      }
      if (isOperator) {
        state.oc[index] = option;
      } else {
        state.cc[index] = option;
      }
      return state;
    }

    case "UPDATEPERCENTAGE": {
      const index = action.index;
      state.fp[index] = !state.fp[index];
      if (state.fp[index] && state.fc[index] > 100) {
        state.fc[index] = 100;
      }
      return state;
    }

    case "MODAL": {
      for (let i = 0; i < state.rModal.length; i++) {
        state.rModal[i] = false;
        state.fModal[i] = false;
      }
      if (action.index >= 0) {
        action.replace
          ? (state.rModal[action.index] = true)
          : (state.fModal[action.index] = true);
      }
      return state;
    }
    case "SAMPLECOLOUR":
      const { r, g, b, a } = action;
      const total = r + g + b;

      state.fc = [r, g, b, a].map((value, index) =>
        state.fp[index] ? convertToPercentage(value, total) : value
      );
      return state;
    default:
      return state;
  }
}

export default replaceReducer;
