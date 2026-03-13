import { useState, useEffect } from "react";
import { Form, Input, InputNumber, Radio, Select, Button } from "antd";
import PageHeader from "../../components/ui/PageHeader";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function AddCourse() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    api.get("/api/admin/teachers").then((res) => setTeachers(res.data || [])).catch(() => setTeachers([]));
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    api.post("/api/admin/create-course", {
      ...values,
      videoLink: values.courseType === "recorded" ? values.videoLink : undefined,
      liveClassLink: values.courseType === "live" ? values.liveClassLink : undefined,
    })
      .then(() => { toast.success("Course created!"); form.resetFields(); })
      .catch((err) => toast.error(err?.response?.data?.message || "Failed"))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <PageHeader title="Add Course" subtitle="Create a new course" />
      <Form form={form} layout="vertical" onFinish={onFinish} className="max-w-[560px]">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}><Input size="large" placeholder="Course title" /></Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}><Input.TextArea rows={4} placeholder="Description" /></Form.Item>
        <Form.Item name="price" label="Price (₹)" initialValue={0}><InputNumber min={0} className="w-full" size="large" /></Form.Item>
        <Form.Item name="teacherId" label="Teacher" rules={[{ required: true }]}>
          <Select size="large" placeholder="Select teacher" options={teachers.map((t) => ({ label: `${t.fullname} (${t.email})`, value: t._id }))} />
        </Form.Item>
        <Form.Item name="courseType" label="Type" initialValue="recorded">
          <Radio.Group options={[{ label: "Recorded", value: "recorded" }, { label: "Live", value: "live" }]} />
        </Form.Item>
        <Form.Item noStyle shouldUpdate={(p, c) => p.courseType !== c.courseType}>
          {({ getFieldValue }) => getFieldValue("courseType") === "recorded" && (
            <Form.Item name="videoLink" label="Video Link" rules={[{ required: true }]}><Input size="large" placeholder="https://..." /></Form.Item>
          )}
        </Form.Item>
        <Form.Item noStyle shouldUpdate={(p, c) => p.courseType !== c.courseType}>
          {({ getFieldValue }) => getFieldValue("courseType") === "live" && (
            <Form.Item name="liveClassLink" label="Live Class Link" rules={[{ required: true }]}><Input size="large" placeholder="https://meet.google.com/..." /></Form.Item>
          )}
        </Form.Item>
        <Form.Item name="thumbnail" label="Thumbnail URL (optional)"><Input size="large" placeholder="https://..." /></Form.Item>
        <Form.Item><Button type="primary" htmlType="submit" size="large" loading={loading}>Create Course</Button></Form.Item>
      </Form>
    </div>
  );
}
