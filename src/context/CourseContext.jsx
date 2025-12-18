import React, { createContext, useState, useContext, useEffect } from "react";
import { getAllCourses, registerCourse } from "../api/api"; // 👈 we'll create this next
import { useAuth } from "./AuthContext";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const { user } = useAuth();

  // Fetch courses from backend
  useEffect(() => {
    async function fetchCourses() {
      const data = await getAllCourses();
      // Add local 'registered' flag so UI stays the same
      const updated = data.map(c => ({ ...c, registered: false }));
      setCourses(updated);
    }
    fetchCourses();
  }, []);

  const toggleRegister = async (courseId) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    // Find selected course
    const updatedCourses = courses.map(course => {
      if (course.course_id === courseId) {
        // Call backend only when registering
        if (!course.registered) {
          registerCourse(user.id, courseId);
        }
        return { ...course, registered: !course.registered };
      }
      return course;
    });

    setCourses(updatedCourses);
    setRegisteredCourses(updatedCourses.filter(c => c.registered));
  };

  return (
    <CourseContext.Provider value={{ courses, toggleRegister, registeredCourses }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
