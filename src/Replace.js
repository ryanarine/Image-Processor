import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { replaceModal, updateInput } from "./Actions/replaceActions";
import Options from "./Options";
import { colours, fullColours, operators } from "./Constants";

const mapOperatorToTitle = (operator, value, index) => {
  let colour = fullColours[index];
  var msg = "";
  switch (operator) {
    case "=":
      msg = `Change the ${colour} value of the selected pixels to ${value}`;
      break;
    case "+":
      msg = `Increase the ${colour} value of the selected pixels by ${value}`;
      break;
    case "-":
      msg = `Decrease the ${colour} value of the selected pixels by ${value}`;
      break;
    case "*":
      msg = `Increase the ${colour} value of the selected pixels by ${value}%`;
      break;
    case "/":
      msg = `Decrease the ${colour} value of the selected pixels by ${value}%`;
      break;
    default:
      return "";
  }
  return msg;
};

function Replace(props) {
  const index = props.index;
  const operator = useSelector(state => state.replace.oc[index]);
  const value = useSelector(state => state.replace.rc[index]);
  const modal = useSelector(state => state.replace.rModal[index]);
  const dispatch = useDispatch();

  let percentage = operator === "*" || operator === "/" ? "%" : "";
  let options = modal ? <Options options={operators} index={index} replace={true} /> : "";
  // The operator button
  let button = (
    <span style={{ position: "relative" }}>
      <button
        type="button"
        title={mapOperatorToTitle(operator, value, index)}
        onClick={e => {
          e.stopPropagation();
          dispatch(replaceModal(index));
        }}
        className="findBtn"
      >
        {operator}
      </button>
      {options}
    </span>
  );

  return (
    <span>
      {button}
      <input type="text" value={value} onChange={e => dispatch(updateInput(e, index))} name={"rc" + colours[index]} />
      {percentage}
    </span>
  );
}

export default Replace;
