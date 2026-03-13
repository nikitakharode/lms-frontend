import { Spin, Typography } from "antd";

export default function Loader({ fullPage = false, size = "default", text = "Loading..." }) {
  const content = (
    <div className="flex flex-col items-center gap-4">
      <Spin size={size} />
      {text && <Typography.Text type="secondary">{text}</Typography.Text>}
    </div>
  );
  if (fullPage) {
    return <div className="min-h-[60vh] flex items-center justify-center">{content}</div>;
  }
  return content;
}
