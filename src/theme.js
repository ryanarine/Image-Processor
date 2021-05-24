import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1e90ff"
    },
    secondary: {
      main: "#6200ea"
    }
  },

  typography: {
    fontFamily: "Quicksand"
  },

  overrides: {
    MuiButton: {
      root: {
        textTransform: "initial"
      }
    }
  }
});
