import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Button, Avatar, Drawer, Menu } from "antd";
import { MenuOutlined, HomeOutlined, BookOutlined, LoginOutlined, UserAddOutlined, DashboardOutlined, LogoutOutlined } from "@ant-design/icons";
import useAuth from "../hooks/useAuth";
import { ROLE_DASHBOARDS } from "../utils/constants";

const { Header } = Layout;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const scrollToCourses = () => {
    document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navItems = !user ? (
    <>
      <Link to="/"><Button type="text">Home</Button></Link>
      <Button type="text" onClick={scrollToCourses}>Courses</Button>
      <Link to="/login"><Button>Login</Button></Link>
      <Link to="/signup"><Button type="primary">Sign Up</Button></Link>
    </>
  ) : (
    <>
      <Link to="/"><Button type="text">Home</Button></Link>
      <Button type="text" onClick={() => { scrollToCourses(); setMobileOpen(false); }}>Courses</Button>
      <Button type="text" onClick={() => { navigate(ROLE_DASHBOARDS[user.role] || "/"); setMobileOpen(false); }}>Dashboard</Button>
      <Avatar className="!bg-indigo-500">{user.fullname?.slice(0, 2).toUpperCase()}</Avatar>
      <Button type="text" danger onClick={logout}>Logout</Button>
    </>
  );

  const mobileMenuItems = [
    { key: "home", icon: <HomeOutlined />, label: <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link> },
    { key: "courses", icon: <BookOutlined />, label: <span onClick={scrollToCourses}>Courses</span> },
    ...(!user
      ? [
          { key: "login", icon: <LoginOutlined />, label: <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link> },
          { key: "signup", icon: <UserAddOutlined />, label: <Link to="/signup" onClick={() => setMobileOpen(false)}>Sign Up</Link> },
        ]
      : [
          { key: "dashboard", icon: <DashboardOutlined />, label: <span onClick={() => { navigate(ROLE_DASHBOARDS[user.role]); setMobileOpen(false); }}>Dashboard</span> },
          { key: "logout", icon: <LogoutOutlined />, label: <span onClick={() => { logout(); setMobileOpen(false); }}>Logout</span> },
        ]),
  ];

  return (
    <>
      <Header className="fixed z-[1000] w-full flex items-center justify-between bg-white px-6 shadow-sm">
        <Link to="/" className="grad-text font-bold text-xl no-underline">EduVerse 🎓</Link>
        <div className="hidden md:flex items-center gap-2">
          {navItems}
        </div>
        <Button type="text" icon={<MenuOutlined />} onClick={() => setMobileOpen(true)} className="md:hidden inline-block" />
      </Header>
      <Drawer title="Menu" placement="right" onClose={() => setMobileOpen(false)} open={mobileOpen} className="md:hidden">
        <Menu mode="vertical" items={mobileMenuItems} className="!border-0" />
      </Drawer>
    </>
  );
}
