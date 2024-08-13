import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";

import { Button, Col, Flex } from "antd";


import { zodResolver } from "@hookform/resolvers/zod";

import { createAcademicFacultySchema } from "../../../Schema/academicManagement.schema";
import {
  
  useCreateAcademicFacultyMutation,

} from "../../../redux/features/admin/academicManagement.api";

import { useToastPromise } from "../../../hooks/useToastPromise";
import PHInput from "../../../components/form/PHInput";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useCreateAcademicFacultyMutation();
 


  const { toastPromise } = useToastPromise();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const academicFacultyData = {
      name: data.name,
     
    };

    await toastPromise(
      addAcademicFaculty,
      academicFacultyData,
      "Creating a faculty..."
    );
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createAcademicFacultySchema)}
        >
          <PHInput label="Name" name="name" />
        
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
