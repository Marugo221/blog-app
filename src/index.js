import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import "antd/dist/antd.css";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./reducer/store";
import {
  setArticlesAsync,
  setArticlesTotalAsync,
  setPageNum,
} from "./action/action";

store.dispatch(setArticlesTotalAsync());
store.dispatch(setArticlesAsync());
store.dispatch(setPageNum(1));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
