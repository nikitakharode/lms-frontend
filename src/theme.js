// Ant Design theme tokens - simple, clean UX
export default {
  token: {
    colorPrimary: "#6366f1",
    borderRadius: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    colorBgContainer: "#ffffff",
    colorBgLayout: "#f8fafc",
    colorText: "#1e293b",
    colorTextSecondary: "#64748b",
  },
  components: {
    Button: { primaryShadow: "none", controlHeight: 40 },
    Input: { activeShadow: "none", controlHeight: 40 },
    Card: { borderRadiusLG: 12 },
    Menu: { itemBorderRadius: 8 },
  },
};
