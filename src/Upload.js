import React from "react";
import { useDispatch } from "react-redux";
import { swap, zoom } from "./Actions/toolActions";

function Upload(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <input id="upload" type="file" onChange={props.change} hidden />
      <button onClick={() => document.getElementById("upload").click()}>Upload Image</button>
      <button onClick={() => dispatch(swap(false))}>
        <i id="leftIcon" title="Copy new preview to old">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </i>
      </button>
      <button className="infoTool" onClick={() => dispatch(zoom(false, false))}>
        +
      </button>
      <button className="infoTool" onClick={() => dispatch(zoom(true, false))}>
        -
      </button>
    </div>
  );
}

export default Upload;