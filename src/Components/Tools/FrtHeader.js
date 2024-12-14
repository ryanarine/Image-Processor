import React from "react";
import FindActions from "./FindActions";
import ReplaceActions from "./ReplaceActions";
import ToleranceActions from "./ToleranceActions";

function FrtHeader() {
  return (
    <>
      <FindActions />
      <ReplaceActions />
      <ToleranceActions />
    </>
  );
}

export default FrtHeader;
