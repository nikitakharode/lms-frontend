import { Form, Input as AntInput } from "antd";

const { TextArea } = AntInput;

export default function Input({ label, error, helperText, required, ...props }) {
  const field = props.multiline ? (
    <TextArea rows={props.rows || 3} {...props} />
  ) : (
    <AntInput {...props} />
  );
  if (!label && !error && !helperText) return field;
  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : undefined}
      help={error || helperText}
      required={required}
      className="mb-4"
    >
      {field}
    </Form.Item>
  );
}
