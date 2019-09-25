import React from "react";
import Replace from "./Replace";

function replaceColour(replace, file, input, event) {
  event.preventDefault();
  let oldVal = [input.fcr, input.fcg, input.fcb, input.fca];
  let newVal = [input.rcr, input.rcg, input.rcb, input.rca];
  let tolerance = [input.tcr, input.tcg, input.tcb, input.tca];
  replace(file, oldVal, newVal, tolerance);
}

function Tools(props) {
  return (
    <div>
      <Replace submit={(state, event) => replaceColour(props.replace, props.file, state, event)} />
    </div>
  );
}

export default Tools;
