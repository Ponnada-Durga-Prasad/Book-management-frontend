import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Authentication/Login";
import Home from "./components/Home";
import MyBooks from "./components/MyBooks";
// eslint-disable-next-line no-undef
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // ✅ Check if token cookie exists
    const hasToken = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("token="));

    if (!hasToken) {
      dispatch({ type: "NO_AUTH" });
      return;
    } // 👈 Don't run checkAuth if not logged in

    const checkAuth = async () => {
      try {
        dispatch({ type: "LOGIN_REQUEST" });

        const res = await axios.get(`${BASE_URL}/api/auth/me`, {
          withCredentials: true,
        });

        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error.message });
      }
    };

    checkAuth();
  }, [dispatch]);

  // You can also default loading to `true` if token cookie is found
  if (auth.loading) {
    return (
      <p style={{ fontSize: "24px", textAlign: "center" }}>🔁 Loading...</p>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={auth.isAuth ? <Navigate to="/" /> : <Login />}
        />

        <Route path="/" element={<Home />} />

        <Route
          path="/my-books"
          element={auth.isAuth ? <MyBooks /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
