import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginStudent, registerStudent } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // ✅ Load user safely from localStorage (handles invalid JSON)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch (err) {
      console.warn("Invalid user data in localStorage, clearing it...");
      localStorage.removeItem("user");
      return null;
    }
  });

  // ✅ Login function
  const login = async (email, password) => {
    try {
      const data = await loginStudent(email, password);

      if (data && data.email) {
        setUser(data);

        // Save user session details
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("studentId", data.id);
        localStorage.setItem("studentName", data.name);
        localStorage.setItem("studentEmail", data.email);

        return true;
      } else {
        alert("Invalid credentials");
        return false;
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed: " + err.message);
      return false;
    }
  };

  // ✅ Register function
  const register = async (name, email, password) => {
    try {
      const res = await registerStudent({ name, email, password });
      alert("Registration successful!");
      return res;
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/login"); // redirect to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
