
import { Descriptions, Avatar, Spin, Row, Col } from "antd";
import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { TStudent } from "../../../types";

const StudentDetail = () => {
  const { studentId } = useParams();
  const { data, isLoading, isFetching } = useGetSingleStudentQuery(studentId);

  const student = data?.data || {} as TStudent;

  if (isLoading || isFetching) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ textAlign: "center", marginBottom: "20px" }}>
          <Avatar size={100} src={student.profileImg} />
          <h2>{`${student.name?.firstName} ${student.name?.middleName} ${student.name?.lastName}`}</h2>
        </Col>
      </Row>

      <Descriptions bordered column={2} size="middle">
        <Descriptions.Item label="Student ID">
          {student.id}
        </Descriptions.Item>
        <Descriptions.Item label="Full Name">
          {student.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">{student.gender}</Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {new Date(student?.dateOfBirth as Date).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Blood Group">
          {student.bloodGroup}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{student.email}</Descriptions.Item>
        <Descriptions.Item label="Contact Number">
          {student.contactNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Emergency Contact No">
          {student.emergencyContactNo}
        </Descriptions.Item>
        <Descriptions.Item label="Present Address" span={2}>
          {student.presentAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Permanent Address" span={2}>
          {student.permanentAddress}
        </Descriptions.Item>

        <Descriptions.Item label="Father's Name">
          {student.guardian?.father?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Father's Occupation">
          {student.guardian?.father?.occupation}
        </Descriptions.Item>
        <Descriptions.Item label="Father's Contact">
          {student.guardian?.father?.contactNumber}
        </Descriptions.Item>

        <Descriptions.Item label="Mother's Name">
          {student.guardian?.mother?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Mother's Occupation">
          {student.guardian?.mother?.occupation}
        </Descriptions.Item>
        <Descriptions.Item label="Mother's Contact">
          {student.guardian?.mother?.contactNumber}
        </Descriptions.Item>

        <Descriptions.Item label="Local Guardian Name">
          {student.localGuardian?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Local Guardian Occupation">
          {student.localGuardian?.occupation}
        </Descriptions.Item>
        <Descriptions.Item label="Local Guardian Contact">
          {student.localGuardian?.contactNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Local Guardian Address" span={2}>
          {student.localGuardian?.address}
        </Descriptions.Item>

        <Descriptions.Item label="Admission Semester">{`${student.admissionSemester?.name} ${student.admissionSemester?.year}`}</Descriptions.Item>
        <Descriptions.Item label="Academic Department">
          {student.academicDepartment?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Academic Faculty">
          {student.academicDepartment?.academicFaculty?.name}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default StudentDetail;
