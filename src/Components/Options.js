import React from "react";
import { useDispatch } from "react-redux";
import { replaceModal, updateOption, findModal } from "Actions/replaceActions";

const arrowStyle = {
  position: "absolute",
  width: "0",
  height: "0",
  borderLeft: "5px solid transparent",
  borderRight: "5px solid transparent",
  borderTop: "10px solid rgba(255,255,255,0.8)",
  top: "calc(-100% + 13px)",
  left: "calc(50% - 5px)",
  animation: "appear 0.3s linear"
};

const boxStyle = {
  position: "absolute",
  width: "max-content",
  height: "25px",
  padding: "5px",
  backgroundColor: "rgba(255,255,255,0.8)",
  top: "calc(-100% - 22.5px)", // half of height + padding
  left: "100%",
  borderRadius: "5px",
  transform: "translateX(calc(-50% - 14px))",
  animation: "appear 0.3s linear"
};

function Options(props) {
  const dispatch = useDispatch();
  const index = props.index;
  const modal = props.replace ? replaceModal : findModal;

  let buttons = props.options.map(option => (
    <button
      key={option}
      type="button"
      className="findBtn"
      onClick={() => dispatch(updateOption(index, option, props.replace))}
    >
      {option}
    </button>
  ));
  // Add event listener for a click to get rid of modal
  window.addEventListener(
    "click",
    function click() {
      window.removeEventListener("click", click, false);
      dispatch(modal(-1));
    },
    false
  );
  return (
    <React.Fragment>
      <div style={arrowStyle}></div>
      <div style={boxStyle}>{buttons}</div>
    </React.Fragment>
  );
}

export default Options;
