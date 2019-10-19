import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateInput } from "./Actions/replaceActions";
import { colours } from "./Constants";

function Tolerance(props) {
  const index = props.index;
  const dispatch = useDispatch();
  const value = useSelector(state => state.replace.tc[index]);
  return <input type="text" value={value} onChange={e => dispatch(updateInput(e, index))} name={"tc" + colours[index]} />;
}

export default Tolerance;
