import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { swap, zoom } from "Actions/toolActions";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

function Upload(props) {
  const dispatch = useDispatch();
  const uploadRef = useRef();

  return (
    <div>
      <input ref={uploadRef} type="file" onChange={props.change} hidden />

      <IconButton onClick={() => uploadRef.current.click()} color="secondary" title="Download Image">
        <SvgIcon
          xmlns="http://www.w3.org/2000/svg"
          enableBackground="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M7,9l1.41,1.41L11,7.83V16h2V7.83l2.59,2.58L17,9l-5-5L7,9z" />
          </g>
        </SvgIcon>
      </IconButton>

      <IconButton onClick={() => dispatch(swap(false))} color="secondary" title="Copy new preview to old">
        <KeyboardBackspaceIcon />
      </IconButton>

      <IconButton onClick={() => dispatch(zoom(false, false))} color="secondary" title="Zoom in">
        <AddIcon />
      </IconButton>

      <IconButton onClick={() => dispatch(zoom(true, false))} color="secondary" title="Zoom out">
        <RemoveIcon />
      </IconButton>
    </div>
  );
}

export default Upload;
