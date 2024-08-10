import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constants/global";
import { codeOptions, yearOptions } from "../../../constants/semester";



const CreateAcademicSemester = () => {
  const onSubmit : SubmitHandler<FieldValues> = (data)=>{

    const name = codeOptions[Number(data.code)-1]?.label

    const academicSemesterData = {
      name,
      code: data.code,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,

    };
    console.log(academicSemesterData);
  }
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect label="Name" name="code" options={codeOptions} />
          <PHSelect label="Year" name="year" options={yearOptions} />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;