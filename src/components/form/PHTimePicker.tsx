import {  Form, TimePicker } from "antd";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type PHDatePickerProps = {
  label: string;
  name: string;
  format? : string  
    rangePicker?:boolean
};

const PHTimePicker = ({
  label,
  name,
  format,rangePicker
}: PHDatePickerProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          {rangePicker ? (
            <TimePicker.RangePicker
              size="large"
              format={format || "HH:mm"}
              {...field}
              defaultOpenValue={dayjs("00:00", format || "HH:mm")}
              style={{ width: "100%", textTransform: "capitalize" }}
            />
          ) : (
            <TimePicker
              size="large"
              format={format || "HH:mm"}
              {...field}
              defaultOpenValue={dayjs("00:00", format || "HH:mm")}
              style={{ width: "100%", textTransform: "capitalize" }}
            />
          )}

          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHTimePicker;
