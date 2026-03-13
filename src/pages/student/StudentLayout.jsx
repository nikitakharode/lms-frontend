import { Outlet, Link, useLocation } from "react-router-dom";
import { Layout, Menu, Avatar } from "antd";
import { DashboardOutlined, BookOutlined, LineChartOutlined, LogoutOutlined } from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";
import { getInitials } from "../../utils/helpers";

const { Header, Sider, Content } = Layout;

export default function StudentLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { key: "/student/dashboard", icon: <DashboardOutlined />, label: <Link to="/student/dashboard">Dashboard</Link> },
    { key: "/student/courses", icon: <BookOutlined />, label: <Link to="/student/courses">My Courses</Link> },
    { key: "/student/progress", icon: <LineChartOutlined />, label: <Link to="/student/progress">Progress</Link> },
    { type: "divider" },
    { key: "logout", icon: <LogoutOutlined />, label: "Logout", danger: true, onClick: logout },
  ];

  return (
    <Layout className="min-h-screen bg-slate-50">
      <Sider breakpoint="lg" collapsedWidth="0" width={240} className="!bg-white shadow-[1px_0_0_0_#e2e8f0]">
        <div className="h-16 flex items-center pl-6 font-bold text-lg">Student</div>
        <Menu selectedKeys={[location.pathname]} items={menuItems} className="!border-0 !px-2" />
      </Sider>
      <Layout>
        <Header className="!bg-white !px-6 flex items-center justify-end shadow-[0_1px_0_0_#e2e8f0]">
          <Avatar className="!bg-indigo-500">{getInitials(user?.fullname)}</Avatar>
        </Header>
        <Content className="m-6 bg-white p-6 rounded-xl min-h-[280px]"><Outlet /></Content>
      </Layout>
    </Layout>
  );
}
