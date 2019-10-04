import React from "react";
import Replace from "./Replace";
import "./Tools.css";

function replaceColour(replace, file, input) {
  let oldVal = [input.fcr, input.fcg, input.fcb, input.fca];
  let newVal = [input.rcr, input.rcg, input.rcb, input.rca];
  let tolerance = [input.tcr, input.tcg, input.tcb, input.tca];
  replace(file, oldVal, newVal, tolerance);
}

function Tools(props) {
  return (
    <div>
      <Replace
        replace={state => replaceColour(props.replace, props.file, state)}
        section={props.section}
        click={props.click}
        pixel={props.pixel}
      />
    </div>
  );
}

export default Tools;
