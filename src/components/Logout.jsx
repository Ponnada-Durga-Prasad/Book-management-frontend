import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
      🚪 Logout
    </button>
  );
};

export default Logout;
