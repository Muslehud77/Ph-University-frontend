import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TPHInput = {
  type?: string;
  name: string;
  className?: string;
  label?: string;
};

const PHInput = ({ type, name, className, label }: TPHInput) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              className={className}
              type={type ? type : "text"}
              id={name}
              {...field}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
