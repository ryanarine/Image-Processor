import React from "react";
import { useDispatch } from "react-redux";
import { swap, zoom } from "./Actions/toolActions";

function Download(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={props.download}>Download</button>
      <button onClick={() => dispatch(swap(true))}>
        <i id="rightIcon" title="Copy old preview to new">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </i>
      </button>
      <button className="infoTool" onClick={() => dispatch(zoom(false, true))}>
        +
      </button>
      <button className="infoTool" onClick={() => dispatch(zoom(true, true))}>
        -
      </button>
      <a id="download" href="/" style={{ display: "none" }} download="converted">
        Download
      </a>
    </div>
  );
}

export default Download;
