import React from "react";
import "Styles/Tools.css";
import FrtHeader from "./FrtHeader";
import FrtValues from "./FrtValues";
import ReplaceButtons from "./ReplaceButtons";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  frtGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, auto)",
    gap: "16px",
  },
});

function Tools() {
  const { frtGrid } = useStyles();

  return (
    <div>
      <div className={frtGrid}>
        <div></div>
        <FrtHeader />
        <FrtValues />
      </div>
      <br />
      <ReplaceButtons />
      <br />
    </div>
  );
}

export default Tools;
