import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import reducer from "./reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
ReactDOM.render(
  <Provider store={createStore(reducer, composeEnhancers())}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
