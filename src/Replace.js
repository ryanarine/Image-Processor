import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { replaceModal, updateInput } from "./Actions/replaceActions";
import Options from "./Options";
import { colours, operators } from "./Constants";

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
