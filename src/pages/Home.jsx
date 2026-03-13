import { useState, useEffect } from "react";
import { Typography, Row, Col, Card, Button, Space } from "antd";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import ButtonUI from "../components/ui/Button";
import { MOCK_COURSES, MOCK_TESTIMONIALS } from "../utils/mockData";
import api from "../api/axios";

const stats = [
  { value: "500+", label: "Courses" },
  { value: "10K+", label: "Students" },
  { value: "200+", label: "Instructors" },
  { value: "95%", label: "Success Rate" },
];

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/api/teacher/courses")
      .then((res) => {
        const data = res.data?.data || [];
        setCourses(Array.isArray(data) && data.length >= 6 ? data : [...(data || []), ...MOCK_COURSES].slice(0, 6));
      })
      .catch(() => setCourses(MOCK_COURSES.slice(0, 6)));
  }, []);

  const displayCourses = courses.length >= 6 ? courses : [...courses, ...MOCK_COURSES].slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <section className="min-h-[60vh] flex items-center justify-center py-12 px-6 pt-[100px] bg-gradient-to-b from-white to-slate-100">
        <div className="text-center max-w-[720px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography.Title level={1} className="!mb-4">Learn Without <span className="grad-text">Limits</span></Typography.Title>
            <Typography.Text type="secondary" className="text-lg block mb-8">Master new skills with live and recorded courses from industry experts.</Typography.Text>
            <Space size="middle" wrap>
              <ButtonUI type="primary" size="large" onClick={() => document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" })}>Explore Courses</ButtonUI>
              <Button href="/signup" size="large">Get Started</Button>
            </Space>
          </motion.div>
        </div>
      </section>

      <section id="courses-section" className="p-12 px-6 max-w-[1200px] mx-auto w-full">
        <Typography.Title level={2} className="text-center mb-8">Featured Courses</Typography.Title>
        <Row gutter={[24, 24]}>
          {displayCourses.map((course, i) => (
            <Col xs={24} sm={12} md={8} key={course._id || i}>
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      </section>

      <section className="p-12 px-6 max-w-[1200px] mx-auto w-full">
        <Row gutter={[24, 24]}>
          {stats.map((s, i) => (
            <Col xs={12} md={6} key={i}>
              <Card size="small" className="rounded-xl text-center">
                <Typography.Title level={4} className="!m-0 text-indigo-500">{s.value}</Typography.Title>
                <Typography.Text type="secondary">{s.label}</Typography.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="p-12 px-6 text-center bg-indigo-500 mx-6 mb-6 rounded-xl">
        <Typography.Title level={3} className="!text-white !mb-4">Ready to transform your future?</Typography.Title>
        <Button type="primary" size="large" href="/signup" className="!bg-white !text-indigo-500">Enroll Now</Button>
      </section>

      <Footer />
    </div>
  );
}
