import SignIn from "./pages/signin/SignIn";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
