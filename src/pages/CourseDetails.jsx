import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Tag, Card, Button, Progress, Modal, Slider, Space, Row, Col } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Badge from "../components/ui/Badge";
import ButtonUI from "../components/ui/Button";
import useAuth from "../hooks/useAuth";
import api from "../api/axios";
import toast from "react-hot-toast";
import { formatPrice, getImageFallback } from "../utils/helpers";
import { MOCK_ASSIGNMENTS } from "../utils/mockData";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressModal, setProgressModal] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [enrollLoading, setEnrollLoading] = useState(false);

  useEffect(() => {
    api.get(`/api/teacher/course/${id}`).then((res) => setCourse(res.data.course)).catch(() => setCourse(null)).finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!user || !id) return;
    if (user.role === "student") {
      api.get(`/api/enroll/${id}/details`).then((res) => {
        setEnrolled(true);
        setProgress(res.data.progress_percentage ?? 0);
        setAssignments(res.data.assignments || []);
      }).catch(() => {});
    }
    api.get(`/api/assignments/course/${id}`).then((res) => { if (res.data?.assignments?.length) setAssignments(res.data.assignments); }).catch(() => {});
  }, [user, id]);

  const handleEnroll = () => {
    if (!user) { navigate("/login"); return; }
    if (user.role !== "student") { toast.error("Only students can enroll."); return; }
    setEnrollLoading(true);
    api.post("/api/enroll/course", { courseId: id }).then(() => { setEnrolled(true); toast.success("Enrolled!"); }).catch((err) => toast.error(err?.response?.data?.message || "Failed")).finally(() => setEnrollLoading(false));
  };

  const handleUpdateProgress = () => {
    api.put("/api/enroll/progress", { courseId: id, progress_percentage: progressValue }).then(() => { setProgress(progressValue); setProgressModal(false); toast.success("Progress updated!"); }).catch((err) => toast.error(err?.response?.data?.message || "Failed"));
  };

  const displayAssignments = assignments.length ? assignments : MOCK_ASSIGNMENTS.filter((a) => a.courseId === id).length ? MOCK_ASSIGNMENTS.filter((a) => a.courseId === id) : MOCK_ASSIGNMENTS.slice(0, 3);
  const isLive = course?.courseType === "live";
  const thumbnail = course?.thumbnail || getImageFallback(id, course?.title);

  if (loading || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Typography.Text type="secondary">{loading ? "Loading..." : "Course not found."}</Typography.Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="h-[280px] bg-slate-50 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.4) 0%, #f8fafc 100%), url(${thumbnail})` }} />
      <div className="max-w-[1200px] -mt-6 mx-auto px-6 pb-12 relative z-10">
        <Row gutter={24}>
          <Col xs={24} md={16}>
            <Space size="small" className="mb-4">
              <Badge type={isLive ? "live" : "recorded"} />
              {course.teacherId?.fullname && <Tag color="blue">{course.teacherId.fullname}</Tag>}
            </Space>
            <Typography.Title level={3} className="!mb-2">{course.title}</Typography.Title>
            <Typography.Text type="secondary" className="block mb-6">{course.description}</Typography.Text>

            {enrolled && user?.role === "student" && (
              <Card size="small" className="mb-6">
                <Typography.Text type="secondary">Your progress</Typography.Text>
                <Progress percent={progress} strokeColor="#6366f1" className="mt-2 mb-3" />
                <Button size="small" onClick={() => { setProgressValue(progress); setProgressModal(true); }}>Update Progress</Button>
              </Card>
            )}

            {displayAssignments.length > 0 && <Typography.Title level={5} className="!mt-6 !mb-3">Assignments</Typography.Title>}
            {displayAssignments.map((a) => (
              <Card key={a._id} size="small" className="mb-2">
                <Typography.Text strong>{a.title}</Typography.Text>
                <Typography.Paragraph type="secondary" className="!my-1 text-[13px]">{a.description}</Typography.Paragraph>
                <Typography.Text type="secondary" className="text-xs">Due: {new Date(a.dueDate).toLocaleDateString()}</Typography.Text>
              </Card>
            ))}
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" className="sticky top-[100px]">
              <Typography.Title level={4} className="!mb-4">{formatPrice(course.price)}</Typography.Title>
              {user?.role === "student" && (
                enrolled ? (
                  <Space direction="vertical" className="w-full">
                    {isLive && course.liveClassLink && <Button type="primary" block href={course.liveClassLink} target="_blank" rel="noopener noreferrer">Join Live Class</Button>}
                    {!isLive && course.videoLink && <Button type="primary" block href={course.videoLink} target="_blank" rel="noopener noreferrer">Watch Now</Button>}
                    <Button block onClick={() => { setProgressValue(progress); setProgressModal(true); }}>Update Progress</Button>
                  </Space>
                ) : (
                  <Space direction="vertical" className="w-full">
                    <ButtonUI type="primary" block onClick={handleEnroll} loading={enrollLoading}>Enroll Now</ButtonUI>
                    <Button block disabled>Razorpay (Coming Soon)</Button>
                  </Space>
                )
              )}
              {!user && <Button type="primary" block onClick={() => navigate("/login")}>Login to Enroll</Button>}
              {user?.role !== "student" && user && <Typography.Text type="secondary">Only students can enroll.</Typography.Text>}
            </Card>
          </Col>
        </Row>
      </div>

      <Modal title="Update Progress" open={progressModal} onCancel={() => setProgressModal(false)} onOk={handleUpdateProgress} okText="Save">
        <Typography.Text>{progressValue}%</Typography.Text>
        <Slider value={progressValue} onChange={setProgressValue} min={0} max={100} className="mt-4" />
      </Modal>

      <Footer />
    </div>
  );
}
