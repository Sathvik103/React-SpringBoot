// src/pages/About.jsx
import React from "react";

export default function About() {
  return (
    <div className="container py-5">
      <h2 className="text-primary mb-3">About CoursePortal</h2>
      <p className="text-secondary">This front-end demo is built with React (Vite) and Bootstrap. It supports searching courses, registering and deregistering them locally via React Context and localStorage. Once your Java + SQL backend is ready, authentication and registration will be persisted on the server.</p>
    </div>
  );
}
