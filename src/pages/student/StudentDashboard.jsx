import { useState, useEffect } from "react";
import { Row, Col, Card, Typography, Progress, Button, Space, Modal, Slider } from "antd";
import StatCard from "../../components/ui/StatCard";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import ButtonUI from "../../components/ui/Button";
import { ReadOutlined, CheckCircleOutlined, PlayCircleOutlined, RiseOutlined } from "@ant-design/icons";
import api from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { MOCK_ASSIGNMENTS } from "../../utils/mockData";
import { getImageFallback } from "../../utils/helpers";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [progressModal, setProgressModal] = useState(false);
  const [razorpayModal, setRazorpayModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [progressValue, setProgressValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/enroll/my-courses").then((res) => setEnrollments(Array.isArray(res.data) ? res.data : [])).catch(() => setEnrollments([])).finally(() => setLoading(false));
  }, []);

  const courses = enrollments.map((e) => ({ ...(e.courseId || {}), progress_percentage: e.progress_percentage ?? 0 }));
  const completed = courses.filter((c) => (c.progress_percentage || 0) >= 100);
  const inProgress = courses.filter((c) => (c.progress_percentage || 0) > 0 && (c.progress_percentage || 0) < 100);
  const avgProgress = courses.length ? Math.round(courses.reduce((a, c) => a + (c.progress_percentage || 0), 0) / courses.length) : 0;

  const openProgressModal = (c) => {
    setSelectedCourse(c);
    setProgressValue(c.progress_percentage || 0);
    setProgressModal(true);
  };

  const handleUpdateProgress = () => {
    if (!selectedCourse?._id) return;
    api.put("/api/enroll/progress", { courseId: selectedCourse._id, progress_percentage: progressValue }).then(() => {
      setEnrollments((prev) => prev.map((e) => (e.courseId?._id === selectedCourse._id ? { ...e, progress_percentage: progressValue } : e)));
      setProgressModal(false);
    }).catch(() => {});
  };

  return (
    <div>
      <PageHeader title="Dashboard" subtitle={`Welcome back, ${user?.fullname || "Student"}!`} />
      <Card size="small" className="mb-6 bg-slate-50">
        <Typography.Text strong>Welcome, {user?.fullname}! 👋</Typography.Text>
        <Typography.Paragraph type="secondary" className="!m-0">Continue learning from where you left off.</Typography.Paragraph>
      </Card>
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}><StatCard title="Enrolled" value={courses.length} icon={<ReadOutlined />} gradient="purple" loading={loading} /></Col>
        <Col xs={24} sm={12} lg={6}><StatCard title="Completed" value={completed.length} icon={<CheckCircleOutlined />} gradient="green" loading={loading} /></Col>
        <Col xs={24} sm={12} lg={6}><StatCard title="In Progress" value={inProgress.length} icon={<PlayCircleOutlined />} gradient="pink" loading={loading} /></Col>
        <Col xs={24} sm={12} lg={6}><StatCard title="Avg Progress" value={`${avgProgress}%`} icon={<RiseOutlined />} gradient="orange" loading={loading} /></Col>
      </Row>
      <Typography.Text strong className="block mb-3">My Enrolled Courses</Typography.Text>
      {courses.length === 0 && !loading && <EmptyState icon="📚" title="No enrollments" description="Enroll in courses from the home page." action={<ButtonUI type="primary" onClick={() => window.location.assign("/")}>Browse Courses</ButtonUI>} />}
      <Row gutter={[16, 16]} className="mb-6">
        {courses.map((c) => (
          <Col xs={24} md={12} key={c._id}>
            <Card size="small" className="rounded-xl">
              <div className="flex gap-4">
                <div className="w-[120px] h-20 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${c.thumbnail || getImageFallback(c._id)})` }} />
                <div className="flex-1">
                  <Typography.Text strong>{c.title}</Typography.Text>
                  <Progress percent={c.progress_percentage || 0} size="small" strokeColor="#6366f1" className="mt-2" />
                  <Space className="mt-2" wrap>
                    {c.courseType === "live" && c.liveClassLink && <Button type="primary" size="small" href={c.liveClassLink} target="_blank">Join Live</Button>}
                    {c.courseType === "recorded" && c.videoLink && <Button type="primary" size="small" href={c.videoLink} target="_blank">Watch</Button>}
                    <Button size="small" onClick={() => openProgressModal(c)}>Update Progress</Button>
                  </Space>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Typography.Text strong className="block mb-3">Assignments</Typography.Text>
      {MOCK_ASSIGNMENTS.slice(0, 3).map((a) => (
        <Card key={a._id} size="small" className="mb-2">
          <Typography.Text strong>{a.title}</Typography.Text>
          <Typography.Paragraph type="secondary" className="!my-1 text-[13px]">{a.description}</Typography.Paragraph>
          <Typography.Text type="secondary" className="text-xs">Due: {new Date(a.dueDate).toLocaleDateString()}</Typography.Text>
        </Card>
      ))}
      <Button type="primary" className="mt-4 !bg-amber-500 hover:!bg-amber-600" onClick={() => setRazorpayModal(true)}>Razorpay Payment — Coming Soon</Button>

      <Modal title="Update Progress" open={progressModal} onCancel={() => setProgressModal(false)} onOk={handleUpdateProgress} okText="Save">
        <Typography.Text>{progressValue}%</Typography.Text>
        <Slider value={progressValue} onChange={setProgressValue} min={0} max={100} className="mt-4" />
      </Modal>
      <Modal title="Razorpay Payment" open={razorpayModal} onCancel={() => setRazorpayModal(false)} footer={<Button onClick={() => setRazorpayModal(false)}>Close</Button>}>
        <Typography.Text type="secondary">Coming Soon</Typography.Text>
      </Modal>
    </div>
  );
}
