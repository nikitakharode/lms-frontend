import { Modal, Button } from "antd";

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onConfirm,
  onCancel,
  onClose,
  loading = false,
  confirmText = "Confirm",
  confirmVariant = "danger",
}) {
  const handleCancel = onCancel || onClose;
  return (
    <Modal
      open={open}
      title={title}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel} disabled={loading}>Cancel</Button>,
        <Button key="ok" type="primary" danger={confirmVariant === "danger"} loading={loading} onClick={onConfirm}>{confirmText}</Button>,
      ]}
    >
      <p className="text-slate-500">{description}</p>
    </Modal>
  );
}
