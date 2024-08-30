import React from "react";
import {
  Card,
  List,
  Avatar,
  Typography,
  Space,
  Tag,
  Divider,
  Row,
  Col,
} from "antd";
import { useGetMyEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const { Title, Text } = Typography;

const MySchedule = () => {
  const { data } = useGetMyEnrolledCoursesQuery(undefined);

  const myEnrolledCourses = data?.data || [];

  return (
    <div>
      <Title level={2}>My Schedule</Title>
      {myEnrolledCourses.map((course, index) => (
        <Card
          key={index}
          title={
            <Space direction="vertical">
              <Title level={4}>
                {course.course.title} ({course.course.prefix}{" "}
                {course.course.code})
              </Title>
              <Text type="secondary">
                {course.academicSemester.name} {course.academicSemester.year} |
                Faculty of {course.academicFaculty.name}
              </Text>
            </Space>
          }
          style={{ marginBottom: 20 }}
        >
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={course.faculty.profileImage} />}
              title={
                <Space direction="vertical">
                  <Text>
                    <strong>Instructor:</strong> {course.faculty.name.firstName}{" "}
                    {course.faculty.name.middleName}{" "}
                    {course.faculty.name.lastName}
                  </Text>
                  <Text type="secondary">Email: {course.faculty.email}</Text>
                  <Text type="secondary">
                    Contact: {course.faculty.contactNumber}
                  </Text>
                </Space>
              }
            />
          </List.Item>
          <Space direction="vertical" size="middle">
            <Text>
              <strong>Section:</strong> {course.offeredCourse.section}
            </Text>
            <Text>
              <strong>Days:</strong>{" "}
              {course.offeredCourse.days.map((day, index) => (
                <Tag color="blue" key={index}>
                  {day}
                </Tag>
              ))}
            </Text>
            <Text>
              <strong>Time:</strong> {course.offeredCourse.startTime} -{" "}
              {course.offeredCourse.endTime}
            </Text>
            <Text>
              <strong>Credits:</strong> {course.course.credits}
            </Text>
          </Space>

          <Divider />

          <Row gutter={16}>
            <Col span={8}>
              <Text>
                <strong>Class Test 1:</strong> {course.courseMarks.classTest1}
              </Text>
            </Col>
            <Col span={8}>
              <Text>
                <strong>Mid Term:</strong> {course.courseMarks.midTerm}
              </Text>
            </Col>
            <Col span={8}>
              <Text>
                <strong>Class Test 2:</strong> {course.courseMarks.classTest2}
              </Text>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 8 }}>
            <Col span={8}>
              <Text>
                <strong>Final Term:</strong> {course.courseMarks.finalTerm}
              </Text>
            </Col>
            <Col span={8}>
              <Text>
                <strong>Grade:</strong> {course.grade || "N/A"}
              </Text>
            </Col>
            <Col span={8}>
              <Text>
                <strong>Grade Points:</strong> {course.gradePoints || "N/A"}
              </Text>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default MySchedule;
