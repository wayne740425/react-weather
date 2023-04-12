import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import App from "./App";
import "./styles.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
