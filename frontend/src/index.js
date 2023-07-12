import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UploadsContextProvider } from "./context/ContactContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UploadsContextProvider>
      <App />
    </UploadsContextProvider>
  </React.StrictMode>
);
