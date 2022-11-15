import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/antd.variable.min.css";
// import "antd/dist/antd.dark.less";
import "./antd.less";
import "./color.less";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
