import { Form, Select } from "antd";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { TOptions } from "../../types/global.type";

type PHSelectProps = {
  label?: string;
  name: string;
  options: TOptions;
  defaultValue?: string;
  loading?: boolean;
  multiple?: boolean;
  setValue : (arg)=>void
};

const PHSelectWithWatch = ({
  label,
  name,
  options,
  defaultValue,
  loading,
  multiple,
  setValue,
}: PHSelectProps) => {
  const { control } = useFormContext();

  const inputValue = useWatch({
    control,
    name,
  });

  setValue(inputValue);

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
            options={options}
            loading={loading}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelectWithWatch;
