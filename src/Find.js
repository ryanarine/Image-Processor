import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateInput, findModal } from "./Actions/replaceActions";
import Options from "./Options";
import { colours, comparisons } from "./Constants";

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
