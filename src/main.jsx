// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CourseProvider } from "./context/CourseContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CourseProvider>
          <App />
        </CourseProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
