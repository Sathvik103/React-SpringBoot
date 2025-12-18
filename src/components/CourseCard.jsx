import React from "react";

export default function CourseCard({ course, isRegistered, onRegister }) {
  const handleRegister = async () => {
    const studentId = localStorage.getItem("studentId");

    if (!studentId) {
      alert("Please log in first!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: Number(studentId),
          courseId: course.courseId, // make sure your course object has courseId
        }),
      });

      if (response.status === 409) {
        const msg = await response.json();
        alert(msg.message || "Already registered for this course");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to register for course");
      }

      alert("Registered successfully!");
      onRegister(course); // triggers state update in parent
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Failed to register: " + err.message);
    }
  };

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body">
        <h5 className="card-title fw-bold">
          {course.title || course.course_name}
        </h5>
        <p className="text-muted mb-1">
          <strong>Instructor:</strong> {course.instructor}
        </p>
        <p className="mb-1">
          <strong>Credits:</strong> {course.credits}
        </p>
        <p className="small text-secondary">
          {course.description || "No description available."}
        </p>
        <button
          onClick={handleRegister}
          className={`btn w-100 ${
            isRegistered ? "btn-success" : "btn-primary"
          }`}
          disabled={isRegistered}
        >
          {isRegistered ? "Registered" : "Register"}
        </button>
      </div>
    </div>
  );
}
