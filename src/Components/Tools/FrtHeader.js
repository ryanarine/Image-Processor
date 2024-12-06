import React from "react";
import ColorInputs from "../Inputs/ColorInputs";
import FindActions from "./FindActions";
import ReplaceActions from "./ReplaceActions";
import ToleranceActions from "./ToleranceActions";

function FrtHeader() {
  return (
    <>
      <div>
        <FindActions />
        <ColorInputs prefix="fc" />
      </div>
      <div>
        <ReplaceActions />
        <ColorInputs prefix="rc" />
      </div>
      <div>
        <ToleranceActions />
        <ColorInputs prefix="tc" />
      </div>
    </>
  );
}

export default FrtHeader;
