import { useState, useEffect } from "react";
import { Form, Input, Select, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import PageHeader from "../../components/ui/PageHeader";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function AddAssignment() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    api.get("/api/teacher/assigned").then((res) => setCourses(Array.isArray(res.data) ? res.data : [])).catch(() => setCourses([]));
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    api.post("/api/assignments", { ...values, dueDate: values.dueDate?.toISOString?.() || values.dueDate })
      .then(() => { toast.success("Assignment added!"); form.resetFields(); })
      .catch((err) => toast.error(err?.response?.data?.message || "Failed"))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <PageHeader title="Add Assignment" subtitle="Create a new assignment" />
      <Form form={form} layout="vertical" onFinish={onFinish} className="max-w-[560px]">
        <Form.Item name="courseId" label="Course" rules={[{ required: true }]}>
          <Select size="large" placeholder="Select course" options={courses.map((c) => ({ label: c.title, value: c._id }))} />
        </Form.Item>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}><Input size="large" placeholder="Assignment title" /></Form.Item>
        <Form.Item name="description" label="Description"><Input.TextArea rows={4} placeholder="Description" /></Form.Item>
        <Form.Item name="dueDate" label="Due Date" initialValue={dayjs().add(7, "day")}><DatePicker showTime size="large" className="w-full" /></Form.Item>
        <Form.Item><Button type="primary" htmlType="submit" size="large" loading={loading}>Add Assignment</Button></Form.Item>
      </Form>
    </div>
  );
}
