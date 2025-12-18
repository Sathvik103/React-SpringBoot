import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      // Call backend login API directly or through AuthContext
      const response = await fetch("http://localhost:8080/api/students/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();

      // Assuming backend returns { studentId, name, email }
      localStorage.setItem("studentId", data.studentId);
      localStorage.setItem("studentName", data.name);

      // Optional: update auth context
      await login(username, password);

      navigate("/my-courses");
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: 380 }}>
        <h3 className="text-center text-primary mb-3">Sign in</h3>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="email"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              required
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-primary">Login</button>
            <Link to="/forgot-password" className="small">
              Forgot?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
