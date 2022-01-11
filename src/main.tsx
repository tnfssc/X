import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { registerSW } from "virtual:pwa-register"; // eslint-disable-line import/no-unresolved
registerSW();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
