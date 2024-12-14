import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { swap, zoom } from "Actions/toolActions";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: `${theme.spacing(2)}px`,
  },
}));

function Upload(props) {
  const dispatch = useDispatch();
  const uploadRef = useRef();
  const { root } = useStyles();

  return (
    <div className={root}>
      <input ref={uploadRef} type="file" onChange={props.change} hidden />

      <IconButton
        onClick={() => uploadRef.current.click()}
        color="primary"
        title="Download Image"
        size="small"
      >
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

      <IconButton
        onClick={() => dispatch(swap(false))}
        color="primary"
        title="Copy new preview to old"
        size="small"
      >
        <KeyboardBackspaceIcon />
      </IconButton>

      <IconButton
        onClick={() => dispatch(zoom(false, false))}
        color="primary"
        title="Zoom in"
        size="small"
      >
        <AddIcon />
      </IconButton>

      <IconButton
        onClick={() => dispatch(zoom(true, false))}
        color="primary"
        title="Zoom out"
        size="small"
      >
        <RemoveIcon />
      </IconButton>
    </div>
  );
}

export default Upload;
