// src/components/Authentication/Register.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/register`, formData, {
        withCredentials: true,
      });

      setSuccess(res.data.message || "Registered successfully!");

      // Optional: redirect after short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Registration failed. Try again.";
      setError(msg);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: "20px" }}>📝 Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          required
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          required
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>

      {error && <p style={{ ...styles.message, color: "red" }}>{error}</p>}
      {success && (
        <p style={{ ...styles.message, color: "green" }}>{success}</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  message: {
    marginTop: "20px",
    fontWeight: "bold",
  },
};

export default Register;
