// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const send = (e) => {
    e.preventDefault();
    alert("If this email exists, a reset link was sent (demo).");
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: 380 }}>
        <h4 className="text-center mb-3">Forgot Password</h4>
        <form onSubmit={send}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="form-control" type="email" required />
          </div>
          <button className="btn btn-primary w-100">Send link</button>
        </form>
      </div>
    </div>
  );
}
