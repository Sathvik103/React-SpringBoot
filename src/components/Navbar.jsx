// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  // ✅ Fallback: get name from localStorage (useful on refresh)
  const displayName = user?.name || localStorage.getItem("studentName") || "User";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          📘 CoursePortal
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-courses">
                    My Courses
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="me-3 text-light">Hi, {displayName}</span>
                <button className="btn btn-light btn-sm" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <Link className="btn btn-light btn-sm" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
