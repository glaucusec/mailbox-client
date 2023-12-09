import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { Routes, Route } from "react-router";
import Home from "./components/Home";
import { useSelector } from "react-redux";

function App() {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
