import { Descriptions, Avatar, Spin, Row, Col } from "antd";
import { useParams } from "react-router-dom";

import { TFaculty } from "../../../types";
import { useGetSingleFacultyQuery } from "../../../redux/features/admin/userManagement.api";

const FacultyDetail = () => {
  const { facultyId } = useParams();
  const { data, isLoading, isFetching } = useGetSingleFacultyQuery(facultyId);

  const faculty = data?.data || ({} as TFaculty);

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
          <Avatar size={100} src={faculty.profileImage} />
          <h2>{`${faculty.name?.firstName} ${faculty.name?.middleName} ${faculty.name?.lastName}`}</h2>
          <h3>Faculty ({faculty.designation})</h3>
        </Col>
      </Row>

      <Descriptions bordered column={2} size="middle">
        <Descriptions.Item label="Faculty ID">{faculty.id}</Descriptions.Item>
        <Descriptions.Item label="Full Name">
          {`${faculty.name?.firstName} ${faculty.name?.middleName} ${faculty.name?.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">{faculty.gender}</Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {new Date(
            faculty?.dateOfBirth as unknown as Date
          ).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{faculty.email}</Descriptions.Item>
        <Descriptions.Item label="Contact Number">
          {faculty.contactNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Present Address" span={2}>
          {faculty.presentAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Permanent Address" span={2}>
          {faculty.permanentAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Designation" span={2}>
          {faculty.designation}
        </Descriptions.Item>
        <Descriptions.Item label="Academic Department">
          {faculty.academicDepartment?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Academic Faculty">
          {faculty.academicFaculty?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {new Date(faculty?.createdAt as unknown as Date).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {new Date(faculty?.updatedAt as unknown as Date).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default FacultyDetail;
