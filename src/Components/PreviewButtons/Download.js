import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { swap, zoom } from "Actions/toolActions";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardBackspace";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles(() => ({
  flipped: {
    transform: "rotateY(180deg)",
  },
}));

function Download(props) {
  const { flipped } = useStyles();

  const dispatch = useDispatch();
  const [anchor, setAnchor] = useState(null);

  const handleClose = () => setAnchor(null);

  const handleDownload = (type) => () => {
    handleClose();
    props.download(type);
  };

  return (
    <div>
      <IconButton
        onClick={(e) => setAnchor(e.currentTarget)}
        color="primary"
        title="Download Image"
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
            <path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z" />
          </g>
        </SvgIcon>
      </IconButton>

      <IconButton
        onClick={() => dispatch(swap(true))}
        color="primary"
        title="Copy old preview to new"
        className={flipped}
      >
        <KeyboardArrowRightIcon />
      </IconButton>

      <IconButton
        onClick={() => dispatch(zoom(false, true))}
        color="primary"
        title="Zoom in"
      >
        <AddIcon />
      </IconButton>

      <IconButton
        onClick={() => dispatch(zoom(true, true))}
        color="primary"
        title="Zoom out"
      >
        <RemoveIcon />
      </IconButton>

      <Menu
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDownload("png")}>PNG</MenuItem>
        <MenuItem onClick={handleDownload("jpeg")}>JPG</MenuItem>
        <MenuItem onClick={handleDownload("webp")}>WebP</MenuItem>
      </Menu>
    </div>
  );
}

export default Download;
