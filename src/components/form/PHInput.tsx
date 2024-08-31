import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TPHInput = {
  type?: string;
  name: string;
  className?: string;
  label?: string;
  defaultValue?:string|number
};

const PHInput = ({ type, name, className, label, defaultValue }: TPHInput) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              defaultValue={defaultValue}
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
