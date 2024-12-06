import React from "react";
import { colours } from "constants.js";
import { FindV2, ReplaceV2, ToleranceV2 } from "Components/Inputs";

function FrtValues() {
  const frt = colours.map((colour, index) => (
    <React.Fragment key={index}>
      <FindV2
        key={"fc" + colour}
        index={index}
        isAlpha={index === colours.length - 1}
      />
      <ReplaceV2 key={"rc" + colour} index={index} />
      <ToleranceV2 key={"tc" + colour} index={index} />
    </React.Fragment>
  ));

  return (
    <>
      <label>Red:</label>
      {frt[0]}
      <label>Green:</label>
      {frt[1]}
      <label>Blue:</label>
      {frt[2]}
      <label>Alpha:</label>
      {frt[3]}
    </>
  );
}

export default FrtValues;
