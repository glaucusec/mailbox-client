import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { Routes, Route, Navigate } from "react-router";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { authActions } from "./context/Auth";
import { useDispatch } from "react-redux";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const loggedIn = auth.email && auth.idToken;

  useEffect(() => {
    (async function () {
      const localIdToken = localStorage.getItem("idToken");
      if (localIdToken) {
        try {
          const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
            { idToken: localIdToken }
          );
          const user = response.data.users[0];
          dispatch(authActions.updateAuth({ idToken: localIdToken, email: user.email }));
          dispatch(authActions.updateUserId(user.localId));
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [auth.idToken]);

  return (
    <Routes>
      <Route path="/login" element={loggedIn ? <Navigate to="/home" /> : <Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/home" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
