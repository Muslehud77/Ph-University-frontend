import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";

import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

import { zodResolver } from "@hookform/resolvers/zod";

import { createAcademicDepartmentSchema } from "../../../Schema/academicManagement.schema";
import {
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";

import { useToastPromise } from "../../../hooks/useToastPromise";
import PHInput from "../../../components/form/PHInput";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useCreateAcademicDepartmentMutation();
  const {
    data: facultyData,
    isLoading,
    isSuccess,
  } = useGetAllAcademicFacultiesQuery([]);

  const facultyOptions = isSuccess
    ? facultyData.data.map((faculty) => ({
        value: faculty._id,
        label: faculty.name,
      }))
    : [];

  const { toastPromise } = useToastPromise();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const academicDepartmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };

    await toastPromise(
      addAcademicDepartment,
      academicDepartmentData,
      "Creating a department..."
    );
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createAcademicDepartmentSchema)}
        >
          <PHInput label="Name" name="name" />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={facultyOptions}
            loading={isLoading}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
