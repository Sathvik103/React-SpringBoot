import React, { useEffect, useState } from "react";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const studentId = localStorage.getItem("studentId");
        console.log("📦 Loaded studentId:", studentId);

        if (!studentId) throw new Error("Student not logged in");

        const res = await fetch(`http://localhost:8080/api/registrations/student/${studentId}`);

        if (!res.ok) {
          const text = await res.text();
          console.error("❌ Fetch failed:", text);
          throw new Error("Failed to fetch registered courses");
        }

        const data = await res.json();
        console.log("✅ Registered courses:", data);
        setCourses(data);
      } catch (e) {
        console.error("⚠️ Error loading courses:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">My Courses</h2>
      {courses.length === 0 ? (
        <p className="text-center text-muted">
          You have not registered for any courses.
        </p>
      ) : (
        <div className="row g-4">
          {courses.map((course) => (
            <div
              className="col-md-4"
              key={course.id || course.courseId}
            >
              <div className="card shadow-sm p-3 h-100">
                <div className="card-body">
                  <h5 className="fw-bold">
                    {course.title || course.courseName}
                  </h5>
                  <p>{course.description || "No description available"}</p>
                  <p className="text-muted">{course.instructor}</p>
                  <small className="text-secondary">
                    Credits: {course.credits} | Seats: {course.maxSeats}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
