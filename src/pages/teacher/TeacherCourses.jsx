import { useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/ui/PageHeader";
import CourseCard from "../../components/CourseCard";
import EmptyState from "../../components/ui/EmptyState";
import api from "../../api/axios";

export default function TeacherCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/teacher/assigned").then((res) => setCourses(Array.isArray(res.data) ? res.data : [])).catch(() => setCourses([])).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader title="My Courses" subtitle="Courses assigned to you" />
      {courses.length === 0 && !loading && <EmptyState icon="📚" title="No courses assigned" />}
      <Row gutter={[24, 24]}>
        {courses.map((c) => (
          <Col xs={24} sm={12} md={8} key={c._id}>
            <CourseCard course={c} onEnroll={() => navigate(`/courses/${c._id}`)} />
            <Button type="default" size="small" className="mt-2" onClick={() => navigate("/teacher/add-assignment")}>Add Assignment</Button>
          </Col>
        ))}
      </Row>
    </div>
  );
}
