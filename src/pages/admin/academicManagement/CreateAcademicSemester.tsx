import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";

import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constants/global";
import { codeOptions, yearOptions } from "../../../constants/semester";
import { zodResolver } from "@hookform/resolvers/zod";

import { createAcademicSemesterSchema } from "../../../Schema/academicManagement.schema";
import { useCreateAcademicSemestersMutation } from "../../../redux/features/admin/academicManagement.api";

import { useToastPromise } from "../../../hooks/useToastPromise";

const CreateAcademicSemester = () => {
  const [addAcademicSemester, { data }] = useCreateAcademicSemestersMutation();
  const { toastPromise } = useToastPromise();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const name = codeOptions[Number(data.code) - 1]?.label;

    const academicSemesterData = {
      name,
      code: data.code,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    const res = await toastPromise(addAcademicSemester, academicSemesterData,"Creating a semester...");
    console.log(res);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createAcademicSemesterSchema)}
        >
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
