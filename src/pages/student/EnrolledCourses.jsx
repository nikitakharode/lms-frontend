import { useState, useEffect } from "react";
import { Row, Col, Tabs } from "antd";
import PageHeader from "../../components/ui/PageHeader";
import CourseCard from "../../components/CourseCard";
import EmptyState from "../../components/ui/EmptyState";
import api from "../../api/axios";

export default function EnrolledCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [tab, setTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/enroll/my-courses").then((res) => setEnrollments(Array.isArray(res.data) ? res.data : [])).catch(() => setEnrollments([])).finally(() => setLoading(false));
  }, []);

  const courses = enrollments.map((e) => ({ ...(e.courseId || {}), progress_percentage: e.progress_percentage ?? 0 }));
  const filtered = courses.filter((c) => {
    if (tab === "all") return true;
    if (tab === "live") return c.courseType === "live";
    if (tab === "recorded") return c.courseType === "recorded";
    if (tab === "completed") return (c.progress_percentage || 0) >= 100;
    if (tab === "inprogress") return (c.progress_percentage || 0) > 0 && (c.progress_percentage || 0) < 100;
    return true;
  });

  const tabItems = [
    { key: "all", label: "All" },
    { key: "live", label: "Live" },
    { key: "recorded", label: "Recorded" },
    { key: "completed", label: "Completed" },
    { key: "inprogress", label: "In Progress" },
  ];

  return (
    <div>
      <PageHeader title="My Courses" subtitle="Your enrolled courses" />
      <Tabs activeKey={tab} onChange={setTab} items={tabItems} className="mb-6" />
      {loading && <div className="p-6 text-slate-500">Loading...</div>}
      {!loading && filtered.length === 0 && <EmptyState icon="📚" title="No courses" description={tab === "all" ? "Enroll from the home page." : `No ${tab} courses.`} />}
      <Row gutter={[24, 24]}>
        {filtered.map((c) => (
          <Col xs={24} sm={12} md={8} key={c._id}>
            <CourseCard course={c} showProgress />
          </Col>
        ))}
      </Row>
    </div>
  );
}
