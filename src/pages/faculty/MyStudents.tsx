import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetEnrolledCoursesQuery, useUpdateMarksMutation } from "../../redux/features/faculty/facultyCourseMangement.api";
import {
  Button,
  Modal,
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Descriptions,
  Tag,
} from "antd";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import { TEnrolledCourse, TOfferedCourse, TRegisteredSemester, TStudent } from "../../types";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useToastPromise } from "../../hooks/useToastPromise";

const { Title, Text } = Typography;

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();
  const {toastPromise} = useToastPromise()
  const [updateMarks] = useUpdateMarksMutation()
  const { data, isFetching } = useGetEnrolledCoursesQuery([
    { name: "semesterRegistration", value: registerSemesterId as string },
    { name: "course", value: courseId as string },
  ]);
  const enrolledCoursesData = data?.data;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<TEnrolledCourse | null>(null);
  const [updatedMarks, setUpdatedMarks] = useState({
    classTest1: 0,
    midTerm: 0,
    classTest2: 0,
    finalTerm: 0,
  });

  const showModal = (student:TEnrolledCourse) => {
    setSelectedStudent(student);
    setUpdatedMarks(student.courseMarks);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedStudent(null);
  };

  const onSubmit : SubmitHandler<FieldValues> = (values) => {
    const { classTest1, classTest2, finalTerm, midTerm } = values;
    const { semesterRegistration, offeredCourse, student } =
      selectedStudent as TEnrolledCourse;

    const markUpdateData = {
      semesterRegistration: (semesterRegistration as TRegisteredSemester)._id,
      offeredCourse : (offeredCourse as TOfferedCourse)._id,
      student : (student as TStudent)._id,
      courseMarks: {
        classTest1: Number(classTest1),
        classTest2: Number(classTest2),
        finalTerm: Number(finalTerm),
        midTerm: Number(midTerm),
      },
    };
    toastPromise(updateMarks, markUpdateData, "Updating the marks...");
    
    setIsModalVisible(false);
    setSelectedStudent(null);
    
  };

  return (
    <div>
      <Title level={2}>My Students</Title>
      <Row gutter={[16, 16]}>
        {enrolledCoursesData?.map((enrollment:any) => (
          <Col key={enrollment.student.id} span={24}>
            <Card bordered>
              <Row gutter={[16, 16]}>
                <Col span={4}>
                  <Avatar size={64} src={enrollment.student.profileImg} />
                </Col>
                <Col span={20}>
                  <Descriptions
                    title={`${enrollment.student.name.firstName} ${enrollment.student.name.middleName} ${enrollment.student.name.lastName}`}
                    bordered
                    size="small"
                    column={2}
                  >
                    <Descriptions.Item label="Student ID">
                      {enrollment.student.id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Course">
                      {enrollment.course.title} ({enrollment.course.code})
                    </Descriptions.Item>
                    <Descriptions.Item label="Faculty">
                      {enrollment.academicFaculty.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Department">
                      {enrollment.academicDepartment.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Semester">
                      {enrollment.academicSemester.name} (
                      {enrollment.academicSemester.year})
                    </Descriptions.Item>
                    <Descriptions.Item label="Marks">
                      <ul>
                        <li>
                          Class Test 1: {enrollment.courseMarks.classTest1}
                        </li>
                        <li>Mid Term: {enrollment.courseMarks.midTerm}</li>
                        <li>
                          Class Test 2: {enrollment.courseMarks.classTest2}
                        </li>
                        <li>Final Term: {enrollment.courseMarks.finalTerm}</li>
                      </ul>
                    </Descriptions.Item>
                    <Descriptions.Item label="Grade">
                      <Tag color="green">{enrollment.grade}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Grade Points">
                      {enrollment.gradePoints}
                    </Descriptions.Item>
                    <Descriptions.Item label="Guardian">
                      Father: {enrollment.student.guardian.father.name} <br />
                      Mother: {enrollment.student.guardian.mother.name}
                    </Descriptions.Item>
                  </Descriptions>
                  <Button
                    type="primary"
                    onClick={() => showModal(enrollment)}
                    style={{ marginTop: "16px" }}
                  >
                    Update Marks
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Update Marks"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedStudent && (
          <Col span={24}>
            <PHForm onSubmit={onSubmit} defaultValues={updatedMarks}>
              <PHInput
                label="Class Test 1"
                name="classTest1"
                type="number"
               
              />
              <PHInput
                label="Mid Term"
                name="midTerm"
                type="number"
               
              />
              <PHInput
                label="Class Test 2"
                name="classTest2"
                type="number"
               
              />
              <PHInput
                label="Final Term"
                name="finalTerm"
                type="number"
               
              />
              <Button htmlType="submit" type="primary" block>
                Submit
              </Button>
            </PHForm>
          </Col>
        )}
      </Modal>
    </div>
  );
};

export default MyStudents;
