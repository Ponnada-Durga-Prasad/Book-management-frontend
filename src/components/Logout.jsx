import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
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
