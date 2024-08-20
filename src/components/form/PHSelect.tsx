import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
import { TOptions } from "../../types/global.type";

type PHSelectProps = {
  label: string;
  name: string;
  options: TOptions;
  defaultValue?: string;
  loading?: boolean;
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
            style={{ width: "100%" ,textTransform:"capitalize"}}
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
