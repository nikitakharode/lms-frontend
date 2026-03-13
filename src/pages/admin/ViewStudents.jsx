import { useState, useEffect } from "react";
import { Input, Table, Avatar } from "antd";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import { getInitials, formatDate } from "../../utils/helpers";
import api from "../../api/axios";

export default function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => { api.get("/api/admin/students").then((res) => setStudents(res.data || [])).catch(() => setStudents([])); }, []);

  const filtered = students.filter((s) => !search || (s.fullname || "").toLowerCase().includes(search.toLowerCase()) || (s.email || "").toLowerCase().includes(search.toLowerCase()));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns = [
    { title: "Student", key: "name", render: (_, r) => <><Avatar className="!mr-2 !bg-indigo-500">{getInitials(r.fullname)}</Avatar>{r.fullname}</> },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role", render: (r) => <Badge type="info" label={r} /> },
    { title: "Joined", dataIndex: "createdAt", key: "createdAt", render: formatDate },
  ];

  return (
    <div>
      <PageHeader title="Students" subtitle="All registered students" />
      <Input placeholder="Search by name or email" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-[320px] mb-4" allowClear />
      <Table columns={columns} dataSource={paginated} rowKey="_id" size="small" pagination={{ current: page, pageSize, total: filtered.length, onChange: (p, s) => { setPage(p); setPageSize(s || 10); }, showSizeChanger: true }} />
    </div>
  );
}
