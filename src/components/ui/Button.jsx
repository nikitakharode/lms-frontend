import { Button as AntButton } from "antd";

const variantMap = {
  gradient: "primary",
  outline: "default",
  ghost: "text",
  danger: "primary", // use danger prop
};

export default function Button({ children, variant = "primary", size = "middle", loading = false, icon, fullWidth, danger, ...props }) {
  const type = variantMap[variant] || "default";
  return (
    <AntButton
      type={variant === "gradient" ? "primary" : type}
      size={size}
      loading={loading}
      icon={icon}
      block={fullWidth}
      danger={danger || variant === "danger"}
      {...props}
    >
      {children}
    </AntButton>
  );
}
