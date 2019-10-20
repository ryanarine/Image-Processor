import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateInput, findModal } from "./Actions/replaceActions";
import Options from "./Options";
import { colours, fullColours, comparisons } from "./Constants";

const mapCompareToTitle = (compare, value, index) => {
  let colour = fullColours[index];
  var msg = "";
  switch (compare) {
    case "=":
      msg = `Select only pixels that have a ${colour} value that is within the tolerance range of ${value}`;
      break;
    case ">":
      msg = `Select only pixels that have a ${colour} value greater than ${value}`;
      break;
    case ">=":
      msg = `Select only pixels that have a ${colour} value greater than or equal to ${value}`;
      break;
    case "<":
      msg = `Select only pixels that have a ${colour} value less than ${value}`;
      break;
    case "<=":
      msg = `Select only pixels that have a ${colour} value less than or equal to ${value}`;
      break;
    default:
      return "";
  }
  return msg;
};

export default function Find(props) {
  const index = props.index;
  const compare = useSelector(state => state.replace.cc[index]);
  const value = useSelector(state => state.replace.fc[index]);
  const modal = useSelector(state => state.replace.fModal[index]);
  const dispatch = useDispatch();

  let options = modal ? <Options options={comparisons} index={index} replace={false} /> : "";
  return (
    <span>
      <span style={{ position: "relative" }}>
        <button
          type="button"
          title={mapCompareToTitle(compare, value, index)}
          onClick={e => {
            e.stopPropagation();
            dispatch(findModal(index));
          }}
          className="findBtn"
        >
          {compare}
        </button>
        {options}
      </span>
      <input type="text" value={value} onChange={e => dispatch(updateInput(e, index))} name={"fc" + colours[index]} />
    </span>
  );
}
