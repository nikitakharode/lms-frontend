import { Card, Typography, Skeleton } from "antd";

const colorMap = {
  purple: "#6366f1",
  pink: "#ec4899",
  green: "#22c55e",
  orange: "#f59e0b",
  blue: "#3b82f6",
};

export default function StatCard({ title, value, icon, gradient = "purple", trend, loading = false }) {
  const color = colorMap[gradient] || colorMap.purple;
  return (
    <Card size="small" className="rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <Typography.Text type="secondary" className="text-xs uppercase">{title}</Typography.Text>
          {loading ? <Skeleton.Input active size="small" className="mt-1" /> : <Typography.Title level={4} className="!my-1" style={{ color }}>{value}</Typography.Title>}
          {trend && <Typography.Text type="success" className="text-xs">{trend}</Typography.Text>}
        </div>
        {icon && <div className="text-[28px]" style={{ color }}>{icon}</div>}
      </div>
    </Card>
  );
}
