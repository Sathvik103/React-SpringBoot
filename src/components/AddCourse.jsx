// src/components/AddCourse.jsx
import React, { useState } from "react";
import { createCourse } from "../api/api";

export default function AddCourse({ onCreated }) {
  const [form, setForm] = useState({
    courseName: "",
    title: "",
    instructor: "",
    description: "",
    credits: 0,
    maxSeats: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "credits" || name === "maxSeats" ? Number(value) : value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const created = await createCourse(form);
      setLoading(false);
      setForm({ courseName: "", title: "", instructor: "", description: "", credits: 0, maxSeats: 0 });
      if (onCreated) onCreated(created);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Failed");
    }
  }

  return (
    <div className="card p-3 mb-4">
      <h5>Add a course</h5>
      <form onSubmit={onSubmit}>
        <div className="mb-2">
          <input name="courseName" value={form.courseName} onChange={onChange} placeholder="Course name (CS101)" className="form-control" required />
        </div>
        <div className="mb-2">
          <input name="title" value={form.title} onChange={onChange} placeholder="Title" className="form-control" required />
        </div>
        <div className="mb-2">
          <input name="instructor" value={form.instructor} onChange={onChange} placeholder="Instructor" className="form-control" />
        </div>
        <div className="mb-2">
          <input name="description" value={form.description} onChange={onChange} placeholder="Short description" className="form-control" />
        </div>
        <div className="d-flex gap-2 mb-2">
          <input name="credits" value={form.credits} onChange={onChange} type="number" placeholder="Credits" className="form-control" />
          <input name="maxSeats" value={form.maxSeats} onChange={onChange} type="number" placeholder="Max seats" className="form-control" />
        </div>

        {error && <div className="text-danger mb-2">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Add Course"}
        </button>
      </form>
    </div>
  );
}
