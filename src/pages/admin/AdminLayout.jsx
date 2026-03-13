import { Outlet, useLocation, Link } from "react-router-dom";
import { Layout, Menu, Avatar } from "antd";
import { DashboardOutlined, PlusCircleOutlined, BookOutlined, TeamOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";
import { getInitials } from "../../utils/helpers";

const { Header, Sider, Content } = Layout;

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { key: "/admin/dashboard", icon: <DashboardOutlined />, label: <Link to="/admin/dashboard">Dashboard</Link> },
    { key: "/admin/add-course", icon: <PlusCircleOutlined />, label: <Link to="/admin/add-course">Add Course</Link> },
    { key: "/admin/courses", icon: <BookOutlined />, label: <Link to="/admin/courses">View Courses</Link> },
    { key: "/admin/teachers", icon: <TeamOutlined />, label: <Link to="/admin/teachers">Teachers</Link> },
    { key: "/admin/students", icon: <UserOutlined />, label: <Link to="/admin/students">Students</Link> },
    { type: "divider" },
    { key: "logout", icon: <LogoutOutlined />, label: "Logout", danger: true, onClick: logout },
  ];

  return (
    <Layout className="min-h-screen bg-slate-50">
      <Sider breakpoint="lg" collapsedWidth="0" width={240} className="!bg-white shadow-[1px_0_0_0_#e2e8f0]">
        <div className="h-16 flex items-center pl-6 font-bold text-lg">Admin</div>
        <Menu selectedKeys={[location.pathname]} items={menuItems} className="!border-0 !px-2" />
      </Sider>
      <Layout>
        <Header className="!bg-white !px-6 flex items-center justify-end shadow-[0_1px_0_0_#e2e8f0]">
          <Avatar className="!bg-indigo-500">{getInitials(user?.fullname)}</Avatar>
        </Header>
        <Content className="m-6 bg-white p-6 rounded-xl min-h-[280px]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
