import { useState, useEffect } from "react";
import { Row, Col, Card, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import StatCard from "../../components/ui/StatCard";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import { ReadOutlined, TeamOutlined } from "@ant-design/icons";
import api from "../../api/axios";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/teacher/assigned").then((res) => setCourses(Array.isArray(res.data) ? res.data : [])).catch(() => setCourses([])).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (courses.length === 0) return;
    Promise.all(courses.slice(0, 5).map((c) => api.get(`/api/enroll/course/${c._id}`).then((r) => (Array.isArray(r.data) ? r.data.length : 0)).catch(() => 0))).then((counts) => setStudentCount(counts.reduce((a, b) => a + b, 0)));
  }, [courses]);

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Your teaching overview" />
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12}><StatCard title="My Courses" value={courses.length} icon={<ReadOutlined />} gradient="purple" loading={loading} /></Col>
        <Col xs={24} sm={12}><StatCard title="Students" value={studentCount} icon={<TeamOutlined />} gradient="pink" loading={loading} /></Col>
      </Row>
      <Typography.Text strong className="block mb-3">Assigned Courses</Typography.Text>
      {courses.length === 0 && !loading && <EmptyState icon="📚" title="No courses assigned" description="Admin will assign courses to you." />}
      <Row gutter={[16, 16]}>
        {courses.map((c) => (
          <Col xs={24} sm={12} md={8} key={c._id}>
            <Card size="small" className="rounded-xl" hoverable onClick={() => navigate("/teacher/courses")}>
              <Typography.Text strong>{c.title}</Typography.Text>
              <Typography.Paragraph type="secondary" className="!my-1">{c.courseType}</Typography.Paragraph>
              <Button type="link" size="small" onClick={(e) => { e.stopPropagation(); navigate("/teacher/students"); }}>View Students</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
