import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { SnackbarProvider } from "notistack";
import { MuiThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import rootReducer from "Reducers/rootReducer";
import App from "./App";
import { theme } from "theme";

export const store = createStore(rootReducer, {}, applyMiddleware(thunk));

const useNotistackStyles = makeStyles(() => ({
  contentRoot: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const NotistackProvider = ({ children }) => {
  const classes = useNotistackStyles();
  return (
    <SnackbarProvider classes={classes} children={children} maxSnack={3} />
  );
};

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <NotistackProvider>
        <App />
      </NotistackProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

/** @TODO Layout change
 *
 * Find [Icon Actions]
 * Hex Input with color picker adornment, Toggle for input types [normal input, slider, etc]
 * Red: [Comparision ops toggles] [input] [value type toggle] [optional input if range comparison selected], ...
 *
 * Replace [Icon Actions (none currently)]
 * Similar to above
 */ 