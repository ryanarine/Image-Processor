import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { swap, zoom } from "./Actions/toolActions";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

function Download(props) {
  const dispatch = useDispatch();
  const [anchor, setAnchor] = useState(null);

  const handleClose = () => setAnchor(null);

  const handleDownload = type => () => {
    handleClose();
    props.download(type);
  };

  return (
    <div>
      <button className="fileBtn" onClick={e => setAnchor(e.currentTarget)}>
        <i id="downloadIcon" title="Download Image">
          &nbsp;&nbsp;&nbsp;&nbsp;
        </i>
      </button>
      <button onClick={() => dispatch(swap(true))}>
        <i id="rightIcon" title="Copy old preview to new">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </i>
      </button>
      <button className="infoTool" onClick={() => dispatch(zoom(false, true))}>
        <i id="plusIcon" title="Zoom in">
          &nbsp;&nbsp;&nbsp;&nbsp;
        </i>
      </button>
      <button className="infoTool" onClick={() => dispatch(zoom(true, true))}>
        <i id="minusIcon" title="Zoom out">
          &nbsp;&nbsp;&nbsp;&nbsp;
        </i>
      </button>
      <Menu anchorEl={anchor} keepMounted open={Boolean(anchor)} onClose={handleClose}>
        <MenuItem onClick={handleDownload("png")}>PNG</MenuItem>
        <MenuItem onClick={handleDownload("jpeg")}>JPG</MenuItem>
        <MenuItem onClick={handleDownload("webp")}>WebP</MenuItem>
      </Menu>
    </div>
  );
}

export default Download;
