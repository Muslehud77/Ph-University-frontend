import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type PHDatePickerProps = {
  label: string;
  name: string;
 
  defaultValue?: string;
 
};

const PHDatePicker = ({
  label,
  name,
 
  defaultValue,

}: PHDatePickerProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <DatePicker 
         
            {...field}
            defaultValue={defaultValue}
            style={{ width: "100%", textTransform: "capitalize" }}
          />

          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHDatePicker;
