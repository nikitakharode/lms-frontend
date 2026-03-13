import { createContext, useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  const restoreSession = useCallback(async () => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) { setLoading(false); return; }

    try {
      const res = await api.get("/api/auth/me");
      setUser(res.data.user);
      setToken(savedToken);
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { restoreSession(); }, [restoreSession]);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    const { token: receivedToken, ...userData } = res.data;

    localStorage.setItem("token", receivedToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(receivedToken);
    setUser(userData);

    toast.success(`Welcome back, ${userData.fullname}! 👋`);
    return userData;
  };

  const register = async (fullname, email, password) => {
    await api.post("/api/auth/register", { fullname, email, password, role: "student" });
    toast.success("Account created! Please login.");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    toast.success("Logged out successfully.");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
