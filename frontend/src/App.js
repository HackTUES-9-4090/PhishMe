import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import AuthForm from "./components/AuthForm.component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<AuthForm title = {'Sign in'}/>} />
        <Route path="/sign-up" element={<AuthForm title = {'Sign up'}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
