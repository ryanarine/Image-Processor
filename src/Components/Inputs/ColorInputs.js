import React, { useCallback, useRef } from "react";
import { Paper, Typography, debounce } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { updateRGB } from "Actions/replaceActions";

const useStyles = makeStyles({
  root: {
    width: 125,
    height: 50,
    border: "0px solid black",
    borderRadius: "4px",
    cursor: "pointer",
    position: "relative",
    margin: "auto",
  },
  text: {
    textShadow: "0px 20px 0px white",
  },
  color: {
    opacity: 0,
    pointerEvents: "none",
    position: "absolute",
    right: 0,
    top: 0,
    width: 0,
    height: 0,
    padding: 0,
    border: 0,
  },
});

function ColorInputs(props) {
  const { prefix } = props;
  const { root, text, color } = useStyles();
  const stateColours = useSelector((state) =>
    state.replace[prefix].slice(0, 3)
  );
  const findPercentages = useSelector((state) => state.replace.fp);
  const replaceOperators = useSelector((state) => state.replace.oc);
  const dispatch = useDispatch();
  const cp = useRef();

  const handleOnChange = useCallback(
    debounce((value) => {
      const hexRegex =
        /#(?<red>[0-9a-f][0-9a-f])(?<green>[0-9a-f][0-9a-f])(?<blue>[0-9a-f][0-9a-f])/;
      const matches = hexRegex.exec(value);
      const { red, green, blue } = matches.groups;
      dispatch(
        updateRGB({
          prefix,
          red: Number(`0x${red}`),
          green: Number(`0x${green}`),
          blue: Number(`0x${blue}`),
        })
      );
    }, 5),
    [dispatch, prefix]
  );

  const hexString = `#${stateColours.map((c) => c.toString(16).padStart(2, "0").toUpperCase()).join("")}`;
  let disabled = false;
  if (prefix === "fc") {
    disabled = findPercentages.some((p) => p);
  } else if (prefix === "rc") {
    disabled = replaceOperators.some((o) => o === "*" || o === "/");
  }

  return (
    <>
      <Paper
        elevation={2}
        className={root}
        style={{
          backgroundColor: hexString,
          ...(disabled && { cursor: "not-allowed" }),
        }}
        onClick={() => {
          if (!disabled) {
            cp.current.click();
          }
        }}
      >
        <Typography className={text} align="center">
          {hexString}
        </Typography>

        <input
          ref={cp}
          className={color}
          type="color"
          value={hexString}
          onChange={(e) => handleOnChange(e.target.value)}
        />
      </Paper>
    </>
  );
}

export default ColorInputs;
