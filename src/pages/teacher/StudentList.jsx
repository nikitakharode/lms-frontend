import { useState, useEffect } from "react";
import { Select, Table } from "antd";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import api from "../../api/axios";

export default function StudentList() {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/api/teacher/assigned").then((res) => setCourses(Array.isArray(res.data) ? res.data : [])).catch(() => setCourses([]));
  }, []);

  useEffect(() => {
    if (!courseId) { setEnrollments([]); return; }
    setLoading(true);
    api.get(`/api/enroll/course/${courseId}`).then((res) => setEnrollments(Array.isArray(res.data) ? res.data : [])).catch(() => setEnrollments([])).finally(() => setLoading(false));
  }, [courseId]);

  const students = enrollments.map((e) => e.userId).filter(Boolean);
  const columns = [{ title: "Name", dataIndex: "fullname", key: "fullname" }, { title: "Email", dataIndex: "email", key: "email" }];

  return (
    <div>
      <PageHeader title="Students" subtitle="View students by course" />
      <Select placeholder="Select course" value={courseId} onChange={setCourseId} className="w-[320px] mb-6" allowClear options={courses.map((c) => ({ label: c.title, value: c._id }))} />
      {courseId && (loading ? <div className="p-6 text-slate-500">Loading...</div> : students.length === 0 ? <EmptyState icon="👥" title="No students" description="No enrollments for this course yet." /> : <Table columns={columns} dataSource={students} rowKey="_id" size="small" pagination={false} />)}
    </div>
  );
}
