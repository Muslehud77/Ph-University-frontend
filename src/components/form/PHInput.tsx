import { Input } from "antd";
import {  Controller } from "react-hook-form";

type TPHInput = {
  type? : string;
  name : string;
  className? : string;
  label? : string
};

const PHInput = ({ type, name, className, label }: TPHInput) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        render={({ field }) => (
          <Input
            className={className}
            type={type ? type : "text"}
            id={name}
            {...field}
          />
        )}
      />
    </div>
  );
};

export default PHInput;