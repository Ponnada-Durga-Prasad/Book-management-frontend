import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // ✅ Import Link to navigate
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  async function handleLogin(e) {
    e.preventDefault();
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      }
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error?.response?.data?.message || "Login failed",
      });
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>
        {auth.error && <p style={styles.error}>{auth.error}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={styles.button} disabled={auth.loading}>
          {auth.loading ? "Logging in..." : "Login"}
        </button>

        {/* ✅ Register Link */}
        <p style={styles.registerText}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.registerLink}>
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(120deg, #f3f3f3, #e0e0e0)",
    fontFamily: "sans-serif",
  },
  form: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1rem",
    fontSize: "1.8rem",
    color: "#333",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border 0.2s ease-in-out",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease-in-out",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
    textAlign: "center",
  },
  registerText: {
    textAlign: "center",
    fontSize: "0.95rem",
    marginTop: "1rem",
    color: "#555",
  },
  registerLink: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;
