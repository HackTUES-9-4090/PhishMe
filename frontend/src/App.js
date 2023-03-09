import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import AuthForm from "./components/AuthForm.component";
import { useContext } from "react";
import UserContext from "./contexts/UserContext";
import DashBoard from "./pages/DashBoard/DashBoard";
import About from "./pages/About/About";

function App() {
  const userContext = useContext(UserContext);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {!userContext.accessToken ? (
            <>
              (
              <Route path="/sign-in" element={<AuthForm title={"Sign in"} />} />
              <Route path="/sign-up" element={<AuthForm title={"Sign up"} />} />
              )
            </>
          ) : null}
          <Route
            path="/"
            element={userContext.accessToken ? <DashBoard /> : <About />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
