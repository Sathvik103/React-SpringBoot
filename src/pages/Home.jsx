// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h1 className="display-5 fw-bold text-primary">CoursePortal</h1>
      <p className="lead text-secondary w-75 text-center">Browse and register for courses. This UI is demo-ready; backend integration will enable real authentication and persistent storage.</p>
      <div className="mt-4">
        <Link className="btn btn-primary me-2" to="/login">Login</Link>
        <Link className="btn btn-outline-primary" to="/about">About</Link>
      </div>
    </div>
  );
}
