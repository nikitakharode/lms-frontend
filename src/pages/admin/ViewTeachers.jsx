import { useState, useEffect } from "react";
import { Card, Row, Col, Avatar, Typography, Button, Modal, Form, Input } from "antd";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { getInitials } from "../../utils/helpers";

export default function ViewTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const load = () => api.get("/api/admin/teachers").then((res) => setTeachers(res.data || [])).catch(() => setTeachers([]));
  useEffect(() => { load(); }, []);

  const onFinish = (values) => {
    setLoading(true);
    api.post("/api/admin/create-teacher", values)
      .then(() => { toast.success("Teacher created!"); setOpen(false); form.resetFields(); load(); })
      .catch((err) => toast.error(err?.response?.data?.message || "Failed"))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <PageHeader title="Teachers" subtitle="Manage teachers" action={<Button type="primary" onClick={() => setOpen(true)}>Add Teacher</Button>} />
      <Row gutter={[16, 16]}>
        {teachers.map((t) => (
          <Col xs={24} sm={12} md={8} key={t._id}>
            <Card size="small" className="rounded-xl">
              <div className="flex items-center gap-3">
                <Avatar className="!bg-indigo-500">{getInitials(t.fullname)}</Avatar>
                <div>
                  <Typography.Text strong>{t.fullname}</Typography.Text>
                  <br />
                  <Typography.Text type="secondary" className="text-xs">{t.email}</Typography.Text>
                  <br />
                  <Badge type="info" label={t.role} />
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      {teachers.length === 0 && <div className="py-12 text-center text-slate-500">No teachers yet. Add one above.</div>}

      <Modal title="Add Teacher" open={open} onCancel={() => setOpen(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="fullname" label="Full Name" rules={[{ required: true }]}><Input size="large" /></Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}><Input size="large" /></Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}><Input.Password size="large" /></Form.Item>
          <Form.Item><Button type="primary" htmlType="submit" block loading={loading}>Create Teacher</Button></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
