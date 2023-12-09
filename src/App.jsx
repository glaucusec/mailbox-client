import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  );
}

export default App;
