export const API_BASE_URL = "https://lms-backend-project-1-yy32.onrender.com";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  COURSE_DETAILS: "/courses/:id",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_ADD_COURSE: "/admin/add-course",
  ADMIN_COURSES: "/admin/courses",
  ADMIN_TEACHERS: "/admin/teachers",
  ADMIN_STUDENTS: "/admin/students",
  TEACHER_DASHBOARD: "/teacher/dashboard",
  TEACHER_COURSES: "/teacher/courses",
  TEACHER_ADD_ASSIGNMENT: "/teacher/add-assignment",
  TEACHER_STUDENTS: "/teacher/students",
  STUDENT_DASHBOARD: "/student/dashboard",
  STUDENT_COURSES: "/student/courses",
  STUDENT_PROGRESS: "/student/progress",
};

export const ROLE_DASHBOARDS = {
  admin: "/admin/dashboard",
  teacher: "/teacher/dashboard",
  student: "/student/dashboard",
};
