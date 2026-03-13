import { Empty, Typography } from "antd";

export default function EmptyState({ icon, title = "Nothing here yet", description = "", action }) {
  return (
    <div className="text-center py-12 px-6">
      {icon && <Typography className="text-5xl mb-4">{icon}</Typography>}
      <Empty description={null} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      <Typography.Title level={5} className="!mt-4">{title}</Typography.Title>
      {description && <Typography.Text type="secondary" className="block mb-4 max-w-[400px] mx-auto">{description}</Typography.Text>}
      {action}
    </div>
  );
}
