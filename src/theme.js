import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8630ff"
    },
    secondary: {
      main: "#6200ea"
    }
  },

  typography: {
    fontFamily: "Quicksand"
  },

  props: {
    MuiTextField: {
      size: "small"
    }
  },

  overrides: {
    MuiButton: {
      root: {
        textTransform: "initial"
      }
    },

    MuiOutlinedInput: {
      inputMarginDense: {
        paddingTop: "8px",
        paddingBottom: "8px"
      }
    }
  }
});
