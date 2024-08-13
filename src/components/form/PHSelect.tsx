import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type PHSelectProps = {
  label: string;
  name: string;
  options: { value: string|number; label: string|number; disabled?: boolean }[];
  defaultValue? : string;
  loading?:boolean
};

const PHSelect = ({
  label,
  name,
  options,
  defaultValue,
  loading,
}: PHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            defaultValue={defaultValue}
            style={{ width: "100%" }}
            options={options}
            loading={loading}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
