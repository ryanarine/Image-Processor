import React from "react";
import { Box, Typography } from "@material-ui/core";
import { colours } from "constants.js";
import { Find, Replace, Tolerance } from "Components/Inputs";

function FrtValues() {
  const frt = colours.map((colour, index) => (
    <React.Fragment key={index}>
      <Find
        key={"fc" + colour}
        index={index}
        isAlpha={index === colours.length - 1}
      />
      <Replace key={"rc" + colour} index={index} />
      <Tolerance key={"tc" + colour} index={index} />
    </React.Fragment>
  ));

  return (
    <>
      <Box margin="auto">
        <Typography variant="body1">Red:</Typography>
      </Box>
      {frt[0]}
      <Box margin="auto">
        <Typography variant="body1">Green:</Typography>
      </Box>
      {frt[1]}
      <Box margin="auto">
        <Typography variant="body1">Blue:</Typography>
      </Box>
      {frt[2]}
      <Box margin="auto">
        <Typography variant="body1">Alpha:</Typography>
      </Box>
      {frt[3]}
    </>
  );
}

export default FrtValues;
