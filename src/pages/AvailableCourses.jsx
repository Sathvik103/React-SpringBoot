import React, { useEffect, useState } from "react";
import { getCourses, registerForCourse } from "../api/api";
import AddCourse from "../components/AddCourse";
import { useAuth } from "../context/AuthContext";

export default function AvailableCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [search, setSearch] = useState("");
  const { user } = useAuth(); // ✅ get current logged-in student

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (e) {
      setErr(e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // called after AddCourse created a new course
  function handleCreated(newCourse) {
    load();
  }

  const handleRegister = async (courseId) => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    try {
      const res = await registerForCourse(user.id, courseId);
      alert(`Successfully registered for ${res.course?.title || "course"}`);
      // optional: visually mark registered
      setCourses((prev) =>
        prev.map((c) =>
          c.id === courseId ? { ...c, registered: true } : c
        )
      );
    } catch (e) {
      alert("Failed to register: " + e.message);
    }
  };

  const filtered = courses.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.title?.toLowerCase().includes(q) ||
      c.courseName?.toLowerCase().includes(q) ||
      c.instructor?.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">Available Courses</h2>

      <div className="d-flex justify-content-center mb-3">
        <input
          className="form-control w-50"
          placeholder="Search by title, instructor or topic..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <AddCourse onCreated={handleCreated} />

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : err ? (
        <p className="text-danger text-center">{err}</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted">No courses match your search.</p>
      ) : (
        <div className="row g-4">
          {filtered.map((course) => (
            <div className="col-md-4" key={course.id}>
              <div className="card h-100 shadow-sm p-3">
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold">{course.title || course.courseName}</h5>
                  <p className="text-muted mb-1">{course.instructor}</p>
                  <p className="small text-secondary mb-2">{course.description}</p>
                  <p className="mb-3">
                    <strong>Credits:</strong> {course.credits}
                  </p>
                  <div className="mt-auto">
                    <button
  className={`btn btn-sm ${course.registered ? "btn-success" : "btn-primary"}`}
  onClick={async () => {
    if (!course.registered) {
      try {
        await registerForCourse(1, course.id); // Assuming studentId = 1 for demo
        setCourses(courses.map(c =>
          c.id === course.id ? { ...c, registered: true } : c
        ));
      } catch (err) {
        alert("Failed to register: " + err.message);
      }
    }
  }}
>
  {course.registered ? "Registered" : "Register"}
</button>


                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
