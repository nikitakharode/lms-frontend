import { useNavigate } from "react-router-dom";
import { Card, Typography, Progress, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Badge from "./ui/Badge.jsx";
import ButtonUI from "./ui/Button.jsx";
import { formatPrice, getImageFallback, truncate } from "../utils/helpers";

export default function CourseCard({ course, onEnroll, showProgress = false }) {
  const navigate = useNavigate();
  const isLive = course.courseType === "live";
  const thumbnail = course.thumbnail || getImageFallback(course._id, course.title);

  return (
    <Card
      hoverable
      cover={
        <div className="relative">
          <img alt={course.title} src={thumbnail} height={180} className="object-cover w-full" onError={(e) => { e.target.src = getImageFallback(course._id); }} />
          <div className="absolute top-3 left-3 z-[1]"><Badge type={isLive ? "live" : "recorded"} /></div>
          <div className="absolute top-3 right-3 bg-black/60 py-1 px-3 rounded-lg z-[1]"><Typography.Text strong className="!text-white">{formatPrice(course.price)}</Typography.Text></div>
        </div>
      }
      className="h-full rounded-xl"
      bodyStyle={{ display: "flex", flexDirection: "column", flex: 1 }}
    >
      <Typography.Title level={5} className="!mb-2 leading-tight">{course.title}</Typography.Title>
      <Typography.Text type="secondary" className="block mb-3 line-clamp-3">{truncate(course.description, 120)}</Typography.Text>
      {showProgress && course.progress_percentage !== undefined && (
        <div className="mt-3">
          <Space className="mb-1">
            <Typography.Text type="secondary" className="text-xs">Progress</Typography.Text>
            <Typography.Text strong className="text-indigo-500">{course.progress_percentage}%</Typography.Text>
          </Space>
          <Progress percent={course.progress_percentage} size="small" strokeColor="#6366f1" />
        </div>
      )}
      <Space className="mt-4 w-full justify-between">
        <ButtonUI variant="outline" size="small" onClick={() => navigate(`/courses/${course._id}`)}>View Details</ButtonUI>
        <ButtonUI variant="gradient" size="small" icon={<ShoppingCartOutlined />} onClick={() => (onEnroll ? onEnroll(course) : navigate(`/courses/${course._id}`))}>Enroll</ButtonUI>
      </Space>
    </Card>
  );
}
