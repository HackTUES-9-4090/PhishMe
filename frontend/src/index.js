import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserContext from "./contexts/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContext.Provider
      value={{
        accessToken: null,
        refreshToken: null,
      }}
    >
      <App />
    </UserContext.Provider>
  </React.StrictMode>
);
