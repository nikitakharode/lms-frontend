import { useState } from "react";
import { Card, Form, Input, Button, Typography, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { register } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      form.setFields([{ name: "confirmPassword", errors: ["Passwords do not match"] }]);
      return;
    }
    setLoading(true);
    try {
      await register(values.fullname, values.email, values.password);
      navigate("/login");
    } catch (err) {
      form.setFields([{ name: "email", errors: [err?.response?.data?.msg || "Registration failed"] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-6 pt-[88px]">
        <Card className="max-w-[440px] w-full rounded-xl shadow-md">
          <Typography.Title level={4} className="!mb-2">Create Account</Typography.Title>
          <Alert message="Teacher accounts are created by Admin only." type="info" showIcon className="mb-6" />
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="fullname" label="Full Name" rules={[{ required: true, message: "Enter your name" }]}>
              <Input size="large" placeholder="John Doe" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Valid email required" }]}>
              <Input size="large" placeholder="you@example.com" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, min: 6, message: "Min 6 characters" }]}>
              <Input.Password size="large" placeholder="••••••••" />
            </Form.Item>
            <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true, message: "Confirm your password" }]}>
              <Input.Password size="large" placeholder="••••••••" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block loading={loading}>Sign Up</Button>
            </Form.Item>
          </Form>
          <Typography.Text type="secondary">Already have an account? <a href="/login">Sign In</a></Typography.Text>
        </Card>
      </div>
    </div>
  );
}
