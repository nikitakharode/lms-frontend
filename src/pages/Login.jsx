import { useState } from "react";
import { Card, Form, Input, Button, Typography, Segmented } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import { ROLE_DASHBOARDS } from "../utils/constants";

export default function Login() {
  const [roleUi, setRoleUi] = useState("student");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userData = await login(values.email, values.password);
      navigate(ROLE_DASHBOARDS[userData.role] || "/");
    } catch (err) {
      form.setFields([{ name: "password", errors: [err?.response?.data?.msg || "Login failed"] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-6 pt-[88px]">
        <Card className="max-w-[440px] w-full rounded-xl shadow-md">
          <Typography.Title level={4} className="!mb-2">Sign In</Typography.Title>
          <Segmented options={[{ label: "Student", value: "student" }, { label: "Teacher", value: "teacher" }, { label: "Admin", value: "admin" }]} value={roleUi} onChange={setRoleUi} block className="mb-6" />
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: "Enter your email" }]}>
              <Input size="large" placeholder="you@example.com" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: "Enter your password" }]}>
              <Input.Password size="large" placeholder="••••••••" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block loading={loading}>Sign In</Button>
            </Form.Item>
          </Form>
          <Typography.Text type="secondary">Don't have an account? <a href="/signup">Sign Up</a></Typography.Text>
        </Card>
      </div>
    </div>
  );
}
