import { Card as AntCard } from "antd";

export default function Card({ children, hover = false, gradient = false, glass = false, noPadding = false, ...props }) {
  return (
    <AntCard
      className={noPadding ? "!p-0" : undefined}
      styles={noPadding ? { body: { padding: 0 } } : undefined}
      {...props}
    >
      {children}
    </AntCard>
  );
}
