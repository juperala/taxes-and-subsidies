import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

ReactDOM.render(
  <BrowserRouter>
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
</BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
