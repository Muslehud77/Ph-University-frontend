import { Button, Col, Flex } from "antd";
import { useGetEnrolledCoursesQuery } from "../../redux/features/faculty/facultyCourseMangement.api";
import PHForm from "../../components/form/PHForm";

import PHSelect from "../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
    const navigate = useNavigate()
    const {data} = useGetEnrolledCoursesQuery(undefined)

   
    const enrolledCourseData = data?.data

    const semesterRegistrationOptions = enrolledCourseData?.map((item:any)=> ({
        label: `${item.academicSemester.name} ${item.academicSemester.year}`,
        value: item.semesterRegistration._id
    }))
    const courseOptions = enrolledCourseData?.map((item:any)=> ({
        label: item.course.title,
        value: item.course._id
    }))

    const onSubmit : SubmitHandler<FieldValues> = (data)=>{
      const {semesterRegistration,course} = data
      navigate(`/faculty/${semesterRegistration}/${course}`);
     
    }

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          // resolver={zodResolver(createAcademicSemesterSchema)}
        >
          {/* <PHInput label="Title" name="title" />
          <PHInput label="Prefix" name="prefix" />
          <PHInput label="Course Code" name="code" type="number" />
          <PHInput label="Credit" name="credits" type="number" /> */}

          <PHSelect
            options={semesterRegistrationOptions}
            label="Semester"
            name="semesterRegistration"
           
          />
          <PHSelect
            options={courseOptions}
            label="Course"
            name="course"
           
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;