import { Tag } from "antd";

const typeMap = {
  live: { color: "red", text: "LIVE" },
  recorded: { color: "blue", text: "Recorded" },
  success: { color: "green", text: "Completed" },
  warning: { color: "orange", text: "Warning" },
  error: { color: "red", text: "Error" },
  info: { color: "default", text: "Info" },
};

export default function Badge({ type = "info", label, size = "md" }) {
  const config = typeMap[type] || typeMap.info;
  return <Tag color={config.color}>{label || config.text}</Tag>;
}
