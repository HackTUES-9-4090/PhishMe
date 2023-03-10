import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import AuthForm from "../components/AuthForm.component";
import DashBoard from "../pages/DashBoard/DashBoard";
import About from "../pages/About/About";
import { useAppContext } from "../contexts/ContextProvider";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

function Router() {
  const { user } = useAppContext();
  console.log(user);
  const accessToken = "";

  return (
    <BrowserRouter>
      <Routes>
        {!accessToken ? (
          <>
            <Route path="/sign-in" element={<AuthForm title={"Sign in"} />} />
            <Route path="/sign-up" element={<AuthForm title={"Sign up"} />} />
          </>
        ) : null}
        <Route path="/" element={!accessToken ? <DashBoard /> : <About />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
