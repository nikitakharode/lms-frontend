import { useState, useEffect } from "react";
import { Row, Col, Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import StatCard from "../../components/ui/StatCard";
import PageHeader from "../../components/ui/PageHeader";
import ButtonUI from "../../components/ui/Button";
import { TeamOutlined, ReadOutlined, UserOutlined, RiseOutlined } from "@ant-design/icons";
import api from "../../api/axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ courses: 0, teachers: 0, students: 0, enrollments: 0 });
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/api/teacher/courses").catch(() => ({ data: {} })),
      api.get("/api/admin/teachers").catch(() => ({ data: [] })),
      api.get("/api/admin/students").catch(() => ({ data: [] })),
      api.get("/api/admin/enrollments").catch(() => ({ data: [] })),
    ]).then(([coursesRes, teachersRes, studentsRes, enrollmentsRes]) => {
      const courses = coursesRes.data?.data || [];
      setStats({
        courses: Array.isArray(courses) ? courses.length : 0,
        teachers: Array.isArray(teachersRes.data) ? teachersRes.data.length : 0,
        students: Array.isArray(studentsRes.data) ? studentsRes.data.length : 0,
        enrollments: Array.isArray(enrollmentsRes.data) ? enrollmentsRes.data.length : 0,
      });
      setRecentCourses(Array.isArray(courses) ? courses.slice(0, 5) : []);
    }).finally(() => setLoading(false));
  }, []);

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Type", dataIndex: "courseType", key: "courseType", render: (t) => t || "—" },
    { title: "Action", key: "action", render: (_, r) => <Button type="link" size="small" onClick={() => navigate(`/courses/${r._id}`)}>View</Button> },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your LMS" />
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}><StatCard title="Total Courses" value={stats.courses} icon={<ReadOutlined />} gradient="purple" loading={loading} /></Col>
        <Col xs={24} sm={12} lg={6}><StatCard title="Teachers" value={stats.teachers} icon={<TeamOutlined />} gradient="pink" loading={loading} /></Col>
        <Col xs={24} sm={12} lg={6}><StatCard title="Students" value={stats.students} icon={<UserOutlined />} gradient="green" loading={loading} /></Col>
        <Col xs={24} sm={12} lg={6}><StatCard title="Enrollments" value={stats.enrollments} icon={<RiseOutlined />} gradient="orange" loading={loading} /></Col>
      </Row>
      <div className="flex justify-between items-center mb-4">
        <strong>Recent Courses</strong>
        <ButtonUI variant="outline" size="small" onClick={() => navigate("/admin/courses")}>View All</ButtonUI>
      </div>
      <Table columns={columns} dataSource={recentCourses} rowKey="_id" size="small" locale={{ emptyText: "No courses yet." }} pagination={false} />
    </div>
  );
}
