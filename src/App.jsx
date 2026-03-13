import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import theme from "./theme";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CourseDetails from "./pages/CourseDetails";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddCourse from "./pages/admin/AddCourse";
import ViewCourses from "./pages/admin/ViewCourses";
import ViewTeachers from "./pages/admin/ViewTeachers";
import ViewStudents from "./pages/admin/ViewStudents";

import TeacherLayout from "./pages/teacher/TeacherLayout";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherCourses from "./pages/teacher/TeacherCourses";
import AddAssignment from "./pages/teacher/AddAssignment";
import StudentList from "./pages/teacher/StudentList";

import StudentLayout from "./pages/student/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import EnrolledCourses from "./pages/student/EnrolledCourses";
import CourseProgress from "./pages/student/CourseProgress";

export default function App() {
  return (
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/courses/:id" element={<CourseDetails />} />

            <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="add-course" element={<AddCourse />} />
              <Route path="courses" element={<ViewCourses />} />
              <Route path="teachers" element={<ViewTeachers />} />
              <Route path="students" element={<ViewStudents />} />
            </Route>

            <Route path="/teacher" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<TeacherDashboard />} />
              <Route path="courses" element={<TeacherCourses />} />
              <Route path="add-assignment" element={<AddAssignment />} />
              <Route path="students" element={<StudentList />} />
            </Route>

            <Route path="/student" element={<ProtectedRoute allowedRoles={["student"]}><StudentLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="courses" element={<EnrolledCourses />} />
              <Route path="progress" element={<CourseProgress />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </AuthProvider>
    </ConfigProvider>
  );
}
