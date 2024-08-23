import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";

import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

import {  semesterStatusOptions } from "../../../constants/semester";



import {  useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";

import { useToastPromise } from "../../../hooks/useToastPromise";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useCreateSemesterMutation } from "../../../redux/features/admin/courseManagement.api";

const SemesterRegistration = () => {
  const {data:semesterData,isFetching,isSuccess} = useGetAllSemestersQuery([{name:"sort",value:"year"}])
  const [addSemester] = useCreateSemesterMutation();
  const { toastPromise } = useToastPromise();

    const semesterOptions = isSuccess
      ? semesterData.data.map((semester) => ({
          value: semester._id,
          label: `${semester.name} ${semester.year}`,
        }))
      : [];

  
  

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
   

    const semesterData = {
     ...data,
     minCredit: Number(data.minCredit),
     maxCredit: Number(data.maxCredit)
    };

    

    await toastPromise(
      addSemester,
      semesterData,
      "Creating a semester..."
    );
    
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          // resolver={zodResolver(createAcademicSemesterSchema)}
        >
          <PHSelect
            loading={isFetching}
            label="Status"
            name="status"
            options={semesterStatusOptions}
          />
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={semesterOptions}
          />
          <PHDatePicker label="Start Date" name="startDate" />
          <PHDatePicker label="End Date" name="endDate" />
          <PHInput label="Minimum Credit" name="minCredit" type="number" />
          <PHInput label="Maximum Credit" name="maxCredit" type="number" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
