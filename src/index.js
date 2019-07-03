import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from 'redux-thunk'

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./Components/App";

const STORE = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={STORE}>
    <App />
  </Provider>,
  document.getElementById("root")
);
