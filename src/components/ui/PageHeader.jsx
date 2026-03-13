import { Breadcrumb, Typography, Space } from "antd";

export default function PageHeader({ title, subtitle, action, breadcrumbs = [] }) {
  return (
    <div className="mb-6">
      {breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs.map((b, i) => (b.href ? { title: <a href={b.href}>{b.label}</a> } : { title: b.label }))} className="mb-2" />
      )}
      <Space className="w-full justify-between flex-wrap">
        <div>
          <Typography.Title level={4} className="!m-0">{title}</Typography.Title>
          {subtitle && <Typography.Text type="secondary">{subtitle}</Typography.Text>}
        </div>
        {action}
      </Space>
      <div className="h-0.5 w-12 bg-gradient-to-r from-indigo-500 to-violet-500 rounded mt-3" />
    </div>
  );
}
