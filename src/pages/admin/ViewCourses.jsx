import { useState, useEffect } from "react";
import { Input, Table, Button, Tag, Modal, Form, Radio, Select, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PageHeader from "../../components/ui/PageHeader";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function ViewCourses() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const load = () => api.get("/api/teacher/courses").then((res) => setCourses(res.data?.data || [])).catch(() => setCourses([]));
  useEffect(() => { load(); }, []);
  useEffect(() => { api.get("/api/admin/teachers").then((res) => setTeachers(res.data || [])).catch(() => {}); }, []);

  const filtered = courses.filter((c) => {
    const matchSearch = !search || (c.title || "").toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.courseType === filter;
    return matchSearch && matchFilter;
  });

  const openEdit = (c) => {
    setSelected(c);
    form.setFieldsValue({
      title: c.title,
      description: c.description,
      price: c.price ?? 0,
      courseType: c.courseType || "recorded",
      videoLink: c.videoLink,
      liveClassLink: c.liveClassLink,
      teacherId: c.teacherId?._id || c.teacherId,
      thumbnail: c.thumbnail,
    });
    setEditOpen(true);
  };

  const handleEdit = () => {
    if (!selected?._id) return;
    form.validateFields().then((values) => {
      setLoading(true);
      api.put(`/api/admin/update/${selected._id}`, { ...values, videoLink: values.courseType === "recorded" ? values.videoLink : undefined, liveClassLink: values.courseType === "live" ? values.liveClassLink : undefined })
        .then(() => { toast.success("Updated!"); setEditOpen(false); load(); })
        .catch((err) => toast.error(err?.response?.data?.message || "Failed"))
        .finally(() => setLoading(false));
    });
  };

  const handleDelete = () => {
    if (!selected?._id) return;
    setDeleteLoading(true);
    api.delete(`/api/admin/delete/${selected._id}`)
      .then(() => { toast.success("Deleted!"); setDeleteOpen(false); setSelected(null); load(); })
      .catch((err) => toast.error(err?.response?.data?.message || "Failed"))
      .finally(() => setDeleteLoading(false));
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Type", dataIndex: "courseType", key: "courseType", render: (t) => <Tag color={t === "live" ? "red" : "blue"}>{t || "—"}</Tag> },
    { title: "Price", dataIndex: "price", key: "price", render: (p) => `₹${p ?? 0}` },
    { title: "Actions", key: "actions", render: (_, r) => <Space><Button type="text" icon={<EditOutlined />} onClick={() => openEdit(r)} /><Button type="text" danger icon={<DeleteOutlined />} onClick={() => { setSelected(r); setDeleteOpen(true); }} /></Space> },
  ];

  return (
    <div>
      <PageHeader title="View Courses" subtitle="Manage all courses" />
      <Space className="mb-4" wrap>
        <Input placeholder="Search courses" value={search} onChange={(e) => setSearch(e.target.value)} className="w-[200px]" allowClear />
        <Space>
          {["all", "live", "recorded"].map((f) => (
            <Button key={f} type={filter === f ? "primary" : "default"} size="small" onClick={() => setFilter(f)}>{f}</Button>
          ))}
        </Space>
      </Space>
      <Table columns={columns} dataSource={filtered} rowKey="_id" size="small" locale={{ emptyText: "No courses found." }} pagination={false} />

      <Modal title="Edit Course" open={editOpen} onCancel={() => setEditOpen(false)} onOk={handleEdit} confirmLoading={loading} width={480}>
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="description" label="Description"><Input.TextArea rows={3} /></Form.Item>
          <Form.Item name="price" label="Price"><Input type="number" /></Form.Item>
          <Form.Item name="teacherId" label="Teacher"><Select placeholder="Teacher" options={teachers.map((t) => ({ label: t.fullname, value: t._id }))} /></Form.Item>
          <Form.Item name="courseType" label="Type"><Radio.Group options={[{ label: "Recorded", value: "recorded" }, { label: "Live", value: "live" }]} /></Form.Item>
          <Form.Item noStyle shouldUpdate={(p, c) => p.courseType !== c.courseType}>
            {({ getFieldValue }) => getFieldValue("courseType") === "recorded" && <Form.Item name="videoLink" label="Video Link"><Input /></Form.Item>}
          </Form.Item>
          <Form.Item noStyle shouldUpdate={(p, c) => p.courseType !== c.courseType}>
            {({ getFieldValue }) => getFieldValue("courseType") === "live" && <Form.Item name="liveClassLink" label="Live Class Link"><Input /></Form.Item>}
          </Form.Item>
        </Form>
      </Modal>

      <ConfirmDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={handleDelete} onCancel={() => setDeleteOpen(false)} loading={deleteLoading} title="Delete course?" description="This will remove the course permanently." confirmText="Delete" />
    </div>
  );
}
