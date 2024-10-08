import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
import { TOptions } from "../../types/global.type";

type PHSelectProps = {
  label?: string;
  name: string;
  options: TOptions;
  defaultValue?: string;
  loading?: boolean;
  multiple?: boolean;
  disabled?:boolean
};

const PHSelect = ({
  label,
  name,
  options,
  defaultValue,
  loading,
  multiple,
  disabled,
}: PHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={multiple ? "multiple" : undefined}
            {...field}
            defaultValue={defaultValue}
            style={{ width: "100%", textTransform: "capitalize" }}
            disabled={disabled}
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
