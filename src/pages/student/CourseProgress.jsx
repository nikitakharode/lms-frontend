import { useState, useEffect } from "react";
import { Row, Col, Card, Typography, Progress } from "antd";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";
import api from "../../api/axios";
import { getProgressColor } from "../../utils/helpers";

export default function CourseProgress() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/enroll/my-courses").then((res) => setEnrollments(Array.isArray(res.data) ? res.data : [])).catch(() => setEnrollments([])).finally(() => setLoading(false));
  }, []);

  const courses = enrollments.map((e) => ({ ...(e.courseId || {}), progress_percentage: e.progress_percentage ?? 0 }));
  const overall = courses.length ? Math.round(courses.reduce((a, c) => a + (c.progress_percentage || 0), 0) / courses.length) : 0;

  if (loading) return <div className="py-12 text-slate-500">Loading...</div>;
  if (courses.length === 0) return <EmptyState icon="📊" title="No progress yet" description="Enroll in courses to see progress here." />;

  return (
    <div>
      <PageHeader title="Course Progress" subtitle="Your learning progress" />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card size="small" className="text-center rounded-xl">
            <Typography.Text type="secondary">Overall Progress</Typography.Text>
            <div className="w-40 h-40 my-4 mx-auto">
              <CircularProgressbar value={overall} text={`${overall}%`} styles={{ path: { stroke: getProgressColor(overall) }, text: { fill: "#1e293b", fontWeight: 700 } }} />
            </div>
          </Card>
        </Col>
        <Col xs={24} md={16}>
          {courses.map((c) => (
            <Card key={c._id} size="small" className="mb-4 rounded-xl">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <Badge type={c.progress_percentage >= 100 ? "success" : "info"} label={c.progress_percentage >= 100 ? "Completed" : "In Progress"} />
                  <Typography.Text strong className="block mt-1">{c.title}</Typography.Text>
                </div>
                <Typography.Text strong className="text-indigo-500">{c.progress_percentage || 0}%</Typography.Text>
              </div>
              <Progress percent={c.progress_percentage || 0} strokeColor={getProgressColor(c.progress_percentage)} className="mt-3" />
            </Card>
          ))}
        </Col>
      </Row>
    </div>
  );
}
