import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";

import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

import { useToastPromise } from "../../../hooks/useToastPromise";

import PHInput from "../../../components/form/PHInput";
import { useCreateCourseMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";

const CreateCourse = () => {
  const {
    data: coursesData,
    isFetching,
    isSuccess,
  } = useGetAllCoursesQuery(undefined);
  const [addCourse] = useCreateCourseMutation();
  const { toastPromise } = useToastPromise();

  const coursesOptions = isSuccess
    ? coursesData.data.map((course) => ({
        value: course._id,
        label: `${course.title} ${course.code}`,
      }))
    : [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const preRequisiteCourses = data.preRequisiteCourses ?  data?.preRequisiteCourses?.map((course:string) => ({course})) : undefined
  
    const courseData = {...data,preRequisiteCourses,code:Number(data?.code),credits: Number(data?.credits)}


    await toastPromise(addCourse, courseData, "Creating a course...");
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          // resolver={zodResolver(createAcademicSemesterSchema)}
        >
          <PHInput label="Title" name="title" />
          <PHInput label="Prefix" name="prefix" />
          <PHInput label="Course Code" name="code" type="number" />
          <PHInput label="Credit" name="credits" type="number" />

          <PHSelect
            options={coursesOptions}
            label="Prerequisite Courses"
            name="preRequisiteCourses"
            multiple={true}
            loading={isFetching}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
