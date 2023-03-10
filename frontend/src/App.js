import React from "react";
import Router from "./components/Router.component";
import { ContextProvider } from "./contexts/ContextProvider";
import MetaProvider from "./hoc/MetaProvider/MetaProvider";

function App() {
  return (
    <ContextProvider>
      <MetaProvider>
        <Router />
      </MetaProvider>
    </ContextProvider>
  );
}

export default App;
