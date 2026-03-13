import { Divider } from "antd";

export default function GradientDivider({ my = 24 }) {
  return <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 via-violet-500 to-transparent" style={{ margin: `${my}px 0` }} />;
}
