// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import AvailableCourses from "./pages/AvailableCourses";
import MyCourses from "./pages/MyCourses";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AvailableCourses />
          </ProtectedRoute>
        } />

        <Route path="/my-courses" element={
          <ProtectedRoute>
            <MyCourses />
          </ProtectedRoute>
        } />

        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
