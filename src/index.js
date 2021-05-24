import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { MuiThemeProvider } from "@material-ui/core";
import rootReducer from "Reducers/rootReducer";
import App from "./App";
import { theme } from "theme";

export const store = createStore(rootReducer, {}, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
