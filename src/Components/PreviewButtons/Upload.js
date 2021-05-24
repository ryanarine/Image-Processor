import React from "react";
import { useDispatch } from "react-redux";
import { swap, zoom } from "Actions/toolActions";

function Upload(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <input id="upload" type="file" onChange={props.change} hidden />
      <button className="fileBtn" onClick={() => document.getElementById("upload").click()}>
        <i id="uploadIcon" title="Upload Image">
          &nbsp;&nbsp;&nbsp;&nbsp;
        </i>
      </button>
      <button onClick={() => dispatch(swap(false))}>
        <i id="leftIcon" title="Copy new preview to old">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </i>
      </button>
      <button className="infoTool" onClick={() => dispatch(zoom(false, false))}>
        <i id="plusIcon" title="Zoom in">
          &nbsp;&nbsp;&nbsp;&nbsp;
        </i>
      </button>
      <button className="infoTool" onClick={() => dispatch(zoom(true, false))}>
        <i id="minusIcon" title="Zoom out">
          &nbsp;&nbsp;&nbsp;&nbsp;
        </i>
      </button>
    </div>
  );
}

export default Upload;
