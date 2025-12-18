export const API_BASE_URL = "http://localhost:8080/api";

async function handleResponse(res) {
  const text = await res.text();
  try {
    return JSON.parse(text || "{}");
  } catch {
    return text;
  }
}

// --- COURSE ---
export async function getCourses() {
  const res = await fetch(`${API_BASE_URL}/courses`);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

export async function createCourse(course) {
  const res = await fetch(`${API_BASE_URL}/courses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  if (!res.ok) throw new Error("Failed to create course");
  return res.json();
}

// --- AUTH ---
export async function loginStudent(a, b) {
  let payload;
  if (typeof a === "object" && a !== null) {
    payload = { email: a.email || a.username || "", password: a.password || "" };
  } else {
    payload = { email: a, password: b };
  }

  const res = await fetch(`${API_BASE_URL}/students/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();

  // Try to parse backend JSON safely
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = {};
  }

  if (!res.ok) {
    throw new Error(body.message || text || "Login failed");
  }

  // ✅ Backend returns { id, name, email, role }
  if (!body.id || !body.email) {
    throw new Error("Invalid credentials");
  }

  return body;
}


export async function registerStudent({ name, email, password }) {
  const res = await fetch(`${API_BASE_URL}/students/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

// --- REGISTRATION ---
export async function registerForCourse(studentId, courseId) {
  const res = await fetch(`${API_BASE_URL}/registrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, courseId }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || "Failed to register");
  return text;
}

export async function getRegisteredCourses(studentId) {
  const res = await fetch(`${API_BASE_URL}/registrations/student/${studentId}`);
  if (!res.ok) throw new Error("Failed to fetch registered courses");
  return res.json();
}
export { getCourses as getAllCourses };
// Legacy alias for backward compatibility
export { createCourse as registerCourse };
